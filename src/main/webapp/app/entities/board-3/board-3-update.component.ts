import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IBoard3, Board3 } from 'app/shared/model/board-3.model';
import { Board3Service } from './board-3.service';

@Component({
  selector: 'jhi-board-3-update',
  templateUrl: './board-3-update.component.html'
})
export class Board3UpdateComponent implements OnInit {
  isSaving: boolean;
  createdDateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [],
    contents: [],
    createdDate: []
  });

  constructor(protected board3Service: Board3Service, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ board3 }) => {
      this.updateForm(board3);
    });
  }

  updateForm(board3: IBoard3) {
    this.editForm.patchValue({
      id: board3.id,
      title: board3.title,
      contents: board3.contents,
      createdDate: board3.createdDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const board3 = this.createFromForm();
    if (board3.id !== undefined) {
      this.subscribeToSaveResponse(this.board3Service.update(board3));
    } else {
      this.subscribeToSaveResponse(this.board3Service.create(board3));
    }
  }

  private createFromForm(): IBoard3 {
    return {
      ...new Board3(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      contents: this.editForm.get(['contents']).value,
      createdDate: this.editForm.get(['createdDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBoard3>>) {
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
