import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { IBoard } from 'app/shared/model/board.model';
import { BoardService } from 'app/board/board.service';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-board-delete-dialog',
  templateUrl: './board-delete-dialog.component.html'
})
export class BoardDeleteDialogComponent {
  board: IBoard;

  constructor(protected boardService: BoardService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.boardService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'boardListModification',
        content: 'Deleted an board'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-board-delete-popup',
  template: ''
})
export class BoardDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ board }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BoardDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.board = board;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/board', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/board', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
