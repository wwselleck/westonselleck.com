package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type RenderingError struct {
	templateName string
	err          error
}

func (re *RenderingError) Error() string {
	return fmt.Sprintf("Failed to render template %s: %s", re.templateName, re.err)
}

type TemplateLookupError struct {
	template     *template.Template
	templateName string
}

func (e *TemplateLookupError) Error() string {
	return fmt.Sprintf("Could not lookup template %s. Available templates are %s.", e.templateName, e.template.DefinedTemplates())
}

func lookupTemplate(t *template.Template, name string) *template.Template {
	template := t.Lookup(name)
	if template != nil {
		return template
	}
	alternateName := fmt.Sprintf("%s.tmpl.html", name)
	return t.Lookup(alternateName)
}

type ViewData map[string]interface{}

type viewContext struct {
	siteConfig SiteConfig
	Data       ViewData
}

func (vc *viewContext) Title() string {
	title := vc.Data["title"]
	if title != nil {
		return title.(string)
	}
	return vc.siteConfig.title
}

func (vc *viewContext) Projects() []Project {
	return vc.siteConfig.projects
}

type ViewRenderer struct {
	siteConfig SiteConfig
	t          *template.Template
}

func NewViewRenderer(siteConfig SiteConfig, viewsDirectoryGlob string) (*ViewRenderer, error) {
	t, err := template.ParseGlob(viewsDirectoryGlob)
	if err != nil {
		return nil, err
	}
	return &ViewRenderer{
		t:          t,
		siteConfig: siteConfig,
	}, nil
}

func (vr *ViewRenderer) Render(name string, data ViewData) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		template := lookupTemplate(vr.t, name)
		if template == nil {
			log.Println((&TemplateLookupError{
				template:     vr.t,
				templateName: name,
			}).Error())
		}

		err := template.Execute(w, &viewContext{
			siteConfig: vr.siteConfig,
			Data:       data,
		})

		if err != nil {
			log.Println((&RenderingError{
				templateName: name,
				err:          err,
			}).Error())
		}
	}

}
