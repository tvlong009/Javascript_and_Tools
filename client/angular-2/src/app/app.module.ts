import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common'
import {BrowserModule} from '@angular/platform-browser'
import {HttpModule} from '@angular/http'

import {routing, appRouterProviders} from './app.routing'
import {HomeBootstrap} from './app.bootstrap'
import {HomeContainer} from './containers/home'
import {GreetingComponent} from './components/index'

@NgModule({
  declarations: [
    HomeBootstrap,
    /* containers */
    HomeContainer,
    /* components */
    GreetingComponent],

  imports: [BrowserModule, HttpModule, routing],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    appRouterProviders,
    [{provide: APP_BASE_HREF, useValue: '/'}],
    [{provide: LocationStrategy, useClass: HashLocationStrategy}]
  ],

  bootstrap: [HomeBootstrap]
})
export class HomeModule {
}
