import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeContainer} from './containers/home';

const homeRoutes: Routes = [
  {path: '', component: HomeContainer}
];

export const appRouterProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(homeRoutes);
