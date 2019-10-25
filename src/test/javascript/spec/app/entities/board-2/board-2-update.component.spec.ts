import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterBoardTest1TestModule } from '../../../test.module';
import { Board2UpdateComponent } from 'app/entities/board-2/board-2-update.component';
import { Board2Service } from 'app/entities/board-2/board-2.service';
import { Board2 } from 'app/shared/model/board-2.model';

describe('Component Tests', () => {
  describe('Board2 Management Update Component', () => {
    let comp: Board2UpdateComponent;
    let fixture: ComponentFixture<Board2UpdateComponent>;
    let service: Board2Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBoardTest1TestModule],
        declarations: [Board2UpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(Board2UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Board2UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Board2Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Board2(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Board2();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
