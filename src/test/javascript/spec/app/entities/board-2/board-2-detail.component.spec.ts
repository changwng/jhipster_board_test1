import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterBoardTest1TestModule } from '../../../test.module';
import { Board2DetailComponent } from 'app/entities/board-2/board-2-detail.component';
import { Board2 } from 'app/shared/model/board-2.model';

describe('Component Tests', () => {
  describe('Board2 Management Detail Component', () => {
    let comp: Board2DetailComponent;
    let fixture: ComponentFixture<Board2DetailComponent>;
    const route = ({ data: of({ board2: new Board2(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterBoardTest1TestModule],
        declarations: [Board2DetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(Board2DetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Board2DetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.board2).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
