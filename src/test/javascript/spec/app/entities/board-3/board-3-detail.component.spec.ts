import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterBoardTest1TestModule } from '../../../test.module';
import { Board3DetailComponent } from 'app/entities/board-3/board-3-detail.component';
import { Board3 } from 'app/shared/model/board-3.model';

describe('Component Tests', () => {
  describe('Board3 Management Detail Component', () => {
    let comp: Board3DetailComponent;
    let fixture: ComponentFixture<Board3DetailComponent>;
    const route = ({ data: of({ board3: new Board3(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBoardTest1TestModule],
        declarations: [Board3DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(Board3DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Board3DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.board3).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
