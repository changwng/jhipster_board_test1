import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterBoardTest1TestModule } from '../../../test.module';
import { Board3Component } from 'app/entities/board-3/board-3.component';
import { Board3Service } from 'app/entities/board-3/board-3.service';
import { Board3 } from 'app/shared/model/board-3.model';

describe('Component Tests', () => {
  describe('Board3 Management Component', () => {
    let comp: Board3Component;
    let fixture: ComponentFixture<Board3Component>;
    let service: Board3Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBoardTest1TestModule],
        declarations: [Board3Component],
        providers: []
      })
        .overrideTemplate(Board3Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(Board3Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Board3Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Board3(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.board3S[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
