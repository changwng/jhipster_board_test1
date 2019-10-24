import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { JhipsterBoardTest1SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BOARD_ROUTE } from 'app/board/board.route';
import { BoardUpdateComponent } from 'app/board/board-update.component';
import { BoardDetailComponent } from 'app/board/board-detail.component';
import { BoardDeleteDialogComponent } from 'app/board/board-delete-dialog.component';

@NgModule({
  declarations: [BoardComponent, BoardUpdateComponent, BoardDetailComponent, BoardDeleteDialogComponent],
  imports: [JhipsterBoardTest1SharedModule, RouterModule.forChild([...BOARD_ROUTE])]
})
export class BoardModule {}
