import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterBoardTest1TestModule } from '../../../test.module';
import { Board3UpdateComponent } from 'app/entities/board-3/board-3-update.component';
import { Board3Service } from 'app/entities/board-3/board-3.service';
import { Board3 } from 'app/shared/model/board-3.model';

describe('Component Tests', () => {
  describe('Board3 Management Update Component', () => {
    let comp: Board3UpdateComponent;
    let fixture: ComponentFixture<Board3UpdateComponent>;
    let service: Board3Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBoardTest1TestModule],
        declarations: [Board3UpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(Board3UpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Board3UpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Board3Service);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Board3(123);
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
        const entity = new Board3();
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
