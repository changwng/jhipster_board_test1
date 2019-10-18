import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SubPageComponent } from './sub-page.component';
import { PAGE_ONE_ROUTE } from './page-one/page-one.route';
import { PAGE_TWO_ROUTE } from './page-two/page-two.route';

export const SUB_PAGE_ROUTE: Route = {
  path: 'sub-page',
  component: SubPageComponent,
  data: {
    authorities: [],
    pageTitle: 'sub-page.title'
  },
  canActivate: [UserRouteAccessService],
  children: [PAGE_ONE_ROUTE, PAGE_TWO_ROUTE]
};
