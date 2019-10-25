import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IBoard2, Board2 } from 'app/shared/model/board-2.model';
import { Board2Service } from './board-2.service';

@Component({
  selector: 'jhi-board-2-update',
  templateUrl: './board-2-update.component.html'
})
export class Board2UpdateComponent implements OnInit {
  isSaving: boolean;
  createdDateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [],
    contents: [],
    createdDate: []
  });

  constructor(protected board2Service: Board2Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ board2 }) => {
      this.updateForm(board2);
    });
  }

  updateForm(board2: IBoard2) {
    this.editForm.patchValue({
      id: board2.id,
      title: board2.title,
      contents: board2.contents,
      createdDate: board2.createdDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const board2 = this.createFromForm();
    if (board2.id !== undefined) {
      this.subscribeToSaveResponse(this.board2Service.update(board2));
    } else {
      this.subscribeToSaveResponse(this.board2Service.create(board2));
    }
  }

  private createFromForm(): IBoard2 {
    return {
      ...new Board2(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      contents: this.editForm.get(['contents']).value,
      createdDate: this.editForm.get(['createdDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBoard2>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
