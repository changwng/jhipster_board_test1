import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBoard3 } from 'app/shared/model/board-3.model';
import { Board3Service } from './board-3.service';

@Component({
  selector: 'jhi-board-3-delete-dialog',
  templateUrl: './board-3-delete-dialog.component.html'
})
export class Board3DeleteDialogComponent {
  board3: IBoard3;

  constructor(protected board3Service: Board3Service, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.board3Service.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'board3ListModification',
        content: 'Deleted an board3'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-board-3-delete-popup',
  template: ''
})
export class Board3DeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ board3 }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(Board3DeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.board3 = board3;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/board-3', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/board-3', { outlets: { popup: null } }]);
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
