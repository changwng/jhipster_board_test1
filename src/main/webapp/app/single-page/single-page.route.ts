import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SinglePageComponent } from './single-page.component';

export const SINGLE_PAGE_ROUTE: Route = {
  path: 'single-page',
  component: SinglePageComponent,
  data: {
    authorities: [],
    pageTitle: 'single-page.title'
  },
  canActivate: [UserRouteAccessService]
};
