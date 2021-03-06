import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterBoardTest1SharedModule } from 'app/shared/shared.module';
import { JhipsterBoardTest1CoreModule } from 'app/core/core.module';
import { JhipsterBoardTest1AppRoutingModule } from './app-routing.module';
import { JhipsterBoardTest1HomeModule } from './home/home.module';
import { JhipsterBoardTest1EntityModule } from './entities/entity.module';
import { JhipsterBoardTest1AppSinglePageModule } from './single-page/single-page.module';
import { JhipsterBoardTest1AppSubPageModule } from './sub-page/sub-page.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterBoardTest1SharedModule,
    JhipsterBoardTest1CoreModule,
    JhipsterBoardTest1HomeModule,
    JhipsterBoardTest1AppSinglePageModule,
    JhipsterBoardTest1AppSubPageModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterBoardTest1EntityModule,
    JhipsterBoardTest1AppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class JhipsterBoardTest1AppModule {}
