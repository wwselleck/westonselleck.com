import { build } from './build';
import { watch } from './watch';
import httpServer = require('http-server');

export function serve() {
  httpServer.createServer({
    root: '../dist'
  });
  build();
  watch();
}

if(require.main === module) {
    serve();
}
