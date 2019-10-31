import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.JhipsterBoardTest1BookModule)
      },
      {
        path: 'board-2',
        loadChildren: () => import('./board-2/board-2.module').then(m => m.JhipsterBoardTest1Board2Module)
      },
      {
        path: 'board-3',
        loadChildren: () => import('./board-3/board-3.module').then(m => m.JhipsterBoardTest1Board3Module)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterBoardTest1EntityModule {}
