import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterBoardTest1SharedModule } from '../shared/shared.module';

import { SUB_PAGE_ROUTE, SubPageComponent } from './';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';

@NgModule({
  imports: [JhipsterBoardTest1SharedModule, RouterModule.forRoot([SUB_PAGE_ROUTE], { useHash: true })],
  declarations: [SubPageComponent, PageOneComponent, PageTwoComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterBoardTest1AppSubPageModule {}
