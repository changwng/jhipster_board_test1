import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterBoardTest1SharedModule } from '../shared/shared.module';

import { SINGLE_PAGE_ROUTE, SinglePageComponent } from './';

@NgModule({
  imports: [JhipsterBoardTest1SharedModule, RouterModule.forRoot([SINGLE_PAGE_ROUTE], { useHash: true })],
  declarations: [SinglePageComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterBoardTest1AppSinglePageModule {}
