import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBoard2 } from 'app/shared/model/board-2.model';
import { Board2Service } from './board-2.service';

@Component({
  selector: 'jhi-board-2-delete-dialog',
  templateUrl: './board-2-delete-dialog.component.html'
})
export class Board2DeleteDialogComponent {
  board2: IBoard2;

  constructor(protected board2Service: Board2Service, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.board2Service.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'board2ListModification',
        content: 'Deleted an board2'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-board-2-delete-popup',
  template: ''
})
export class Board2DeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ board2 }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(Board2DeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.board2 = board2;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/board-2', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/board-2', { outlets: { popup: null } }]);
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
