import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterBoardTest1SharedModule } from 'app/shared/shared.module';
import { Board2Component } from './board-2.component';
import { Board2DetailComponent } from './board-2-detail.component';
import { Board2UpdateComponent } from './board-2-update.component';
import { Board2DeletePopupComponent, Board2DeleteDialogComponent } from './board-2-delete-dialog.component';
import { board2Route, board2PopupRoute } from './board-2.route';

const ENTITY_STATES = [...board2Route, ...board2PopupRoute];

@NgModule({
  imports: [JhipsterBoardTest1SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [Board2Component, Board2DetailComponent, Board2UpdateComponent, Board2DeleteDialogComponent, Board2DeletePopupComponent],
  entryComponents: [Board2DeleteDialogComponent]
})
export class JhipsterBoardTest1Board2Module {}
