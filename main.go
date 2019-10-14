package main

import (
	"log"
	"net/http"
)

type Project struct {
	Link        string
	Title       string
	Description string
}

type SiteConfig struct {
	title    string
	projects []Project
}

func handleIndex(vr *ViewRenderer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vr.Render("index", nil)(w, r)
	}
}

func handleDefault(vr *ViewRenderer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			handleIndex(vr)(w, r)
			return
		}
		http.NotFound(w, r)
	}
}

func main() {
	baseConfig := SiteConfig{
		title: "Weston Selleck",
		projects: []Project{
			{
				Link:        "https://github.com/wwselleck/weston.dev",
				Title:       "weston.dev",
				Description: "This website",
			},
			{
				Link:        "https://github.com/wwselleck/it-could-be-trivia",
				Title:       "it-could-be-trivia",
				Description: "A chat bot for playing trivia",
			},
			{
				Link:        "https://github.com/wwselleck/bolt-interactive",
				Title:       "bolt-interactive",
				Description: "An interactive CLI for managing Bolt projects",
			},
			{
				Link:        "https://github.com/wwselleck/DriveCMS",
				Title:       "DriveCMS",
				Description: "Use Google Drive as a simple CMS for your website",
			},
		},
	}
	viewRenderer, err := NewViewRenderer(baseConfig, "./templates/*.tmpl.html")
	if err != nil {
		log.Fatal(err)
	}

	http.Handle("/public/", http.StripPrefix("/public/",
		http.FileServer((http.Dir("./public"))),
	))
	http.HandleFunc("/", handleDefault(viewRenderer))
	http.ListenAndServe(":8080", nil)
}
