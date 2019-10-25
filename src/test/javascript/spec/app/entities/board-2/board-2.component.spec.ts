import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterBoardTest1TestModule } from '../../../test.module';
import { Board2Component } from 'app/entities/board-2/board-2.component';
import { Board2Service } from 'app/entities/board-2/board-2.service';
import { Board2 } from 'app/shared/model/board-2.model';

describe('Component Tests', () => {
  describe('Board2 Management Component', () => {
    let comp: Board2Component;
    let fixture: ComponentFixture<Board2Component>;
    let service: Board2Service;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBoardTest1TestModule],
        declarations: [Board2Component],
        providers: []
      })
        .overrideTemplate(Board2Component, '')
        .compileComponents();

      fixture = TestBed.createComponent(Board2Component);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Board2Service);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Board2(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.board2S[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
