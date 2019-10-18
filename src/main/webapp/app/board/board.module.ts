import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { JhipsterBoardTest1SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BOARD_ROUTE } from 'app/board/board.route';

@NgModule({
  declarations: [BoardComponent],
  imports: [JhipsterBoardTest1SharedModule, RouterModule.forChild([BOARD_ROUTE])]
})
export class BoardModule {}
