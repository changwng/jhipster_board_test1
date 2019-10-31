import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterBoardTest1TestModule } from '../../../test.module';
import { Board3DeleteDialogComponent } from 'app/entities/board-3/board-3-delete-dialog.component';
import { Board3Service } from 'app/entities/board-3/board-3.service';

describe('Component Tests', () => {
  describe('Board3 Management Delete Component', () => {
    let comp: Board3DeleteDialogComponent;
    let fixture: ComponentFixture<Board3DeleteDialogComponent>;
    let service: Board3Service;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBoardTest1TestModule],
        declarations: [Board3DeleteDialogComponent]
      })
        .overrideTemplate(Board3DeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Board3DeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Board3Service);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
