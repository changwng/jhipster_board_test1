import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterBoardTest1TestModule } from '../../../test.module';
import { Board2DeleteDialogComponent } from 'app/entities/board-2/board-2-delete-dialog.component';
import { Board2Service } from 'app/entities/board-2/board-2.service';

describe('Component Tests', () => {
  describe('Board2 Management Delete Component', () => {
    let comp: Board2DeleteDialogComponent;
    let fixture: ComponentFixture<Board2DeleteDialogComponent>;
    let service: Board2Service;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBoardTest1TestModule],
        declarations: [Board2DeleteDialogComponent]
      })
        .overrideTemplate(Board2DeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Board2DeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Board2Service);
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
