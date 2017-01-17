import {App} from './app'
import {Dashboard, DashboardRoute, AboutRoute, NotFoundRoute} from './pages'

export const AppRoute = {
    childRoutes: [
        {
            path: '/',
            component: App,
            indexRoute: {
                component: Dashboard
            },
            childRoutes: [
                DashboardRoute,
                AboutRoute,
                NotFoundRoute
            ]
        }
    ]
}
