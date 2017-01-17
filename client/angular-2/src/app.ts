import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {HomeModule} from './app/app.module';

export function main(initialHmrState?: any): Promise<any> {
  return platformBrowserDynamic().bootstrapModule(HomeModule)
      .catch(err => console.error(err));
}

if (ENV === 'development' && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}
