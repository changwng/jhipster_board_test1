import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterBoardTest1SharedModule } from 'app/shared/shared.module';
import { Board3Component } from './board-3.component';
import { Board3DetailComponent } from './board-3-detail.component';
import { Board3UpdateComponent } from './board-3-update.component';
import { Board3DeletePopupComponent, Board3DeleteDialogComponent } from './board-3-delete-dialog.component';
import { board3Route, board3PopupRoute } from './board-3.route';

const ENTITY_STATES = [...board3Route, ...board3PopupRoute];

@NgModule({
  imports: [JhipsterBoardTest1SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [Board3Component, Board3DetailComponent, Board3UpdateComponent, Board3DeleteDialogComponent, Board3DeletePopupComponent],
  entryComponents: [Board3DeleteDialogComponent]
})
export class JhipsterBoardTest1Board3Module {}
