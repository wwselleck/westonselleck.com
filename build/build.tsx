import * as React from 'react';
import ReactDOMServer = require('react-dom/server');
import fs = require('fs');
import path = require('path');
import recursiveReadDir = require('recursive-readdir');
import mkdirp = require('mkdirp');

async function getFileNames() {
    return (await recursiveReadDir('./src')).map(fileName => {
        let [first, ...rest] = fileName.split(path.sep);
        return path.join(...rest);
    });
}

export async function build () {
    let files = await getFileNames();
    let writePromises = files.map(async (f) => {
      let Component = (await import(path.join(process.cwd(), 'src', f))).Component;
      let html = ReactDOMServer.renderToString(<Component />);
      let writePath = path.join(process.cwd(), 'dist', f)
      return new Promise((resolve, reject) => {
          mkdirp(path.dirname(writePath), (err) => {
              fs.writeFile(writePath, html, (err) => {
                resolve();
              });
          });
      });
    })
    return Promise.all(writePromises);
}

if(require.main === module) {
    build();
}
