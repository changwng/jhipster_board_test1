import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BoardService } from 'app/board/board.service';
import { IBoard, Board } from 'app/shared/model/board.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-board-update',
  templateUrl: './board-update.component.html'
})
export class BoardUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [],
    contents: [],
    createdDate: []
  });

  constructor(protected boardService: BoardService, private fb: FormBuilder, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ board }) => {
      this.updateForm(board);
    });
  }

  updateForm(board: IBoard) {
    this.editForm.patchValue({
      id: board.id,
      title: board.title,
      contents: board.contents,
      createdDate: board.createdDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const board = this.createFromForm();
    if (board.id !== undefined) {
      this.subscribeToSaveResponse(this.boardService.update(board));
    } else {
      this.subscribeToSaveResponse(this.boardService.create(board));
    }
  }

  private createFromForm(): IBoard {
    return {
      ...new Board(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      contents: this.editForm.get(['contents']).value,
      createdDate: this.editForm.get(['createdDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBoard>>) {
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
