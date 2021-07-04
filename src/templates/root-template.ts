export function renderRoot (str: string, opts?: any) {
  return `
    <head>
      <title>Weston Selleck</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap"
        rel="stylesheet">
      <link rel="stylesheet" href="public/reset.css" type="text/css" />
      <link rel="stylesheet" href="public/styles.css" type="text/css" />
    </head>
    <body>
      ${str}
      ${opts?.scripts?.map(scriptName => `<script src="${scriptName}"></script>`) ?? ''}
    </body>
  `;
}
