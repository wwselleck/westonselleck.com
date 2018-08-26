import { build } from './build';
import nodeWatch = require('node-watch');

export function watch() {
  nodeWatch('./src', { recursive: true }, () => {
    build();
  })
}

if(require.main === module) {
    watch();
}
