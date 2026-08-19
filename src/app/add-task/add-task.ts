import { Component } from '@angular/core';
import { v4 } from 'uuid';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { TaskCreate } from '../store/tasks.model';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  public form: FormGroup;

  constructor(public store: Store) {
    this.form = new FormGroup({
      task: new FormControl('', [
        Validators.minLength(2),
        Validators.required,
        Validators.pattern(/[a-zA-Z]+/),
      ]),
    });
  }

  addTask() {
    // update state
    this.store.dispatch(
      new TaskCreate({
        id: v4(),
        text: this.form.get('task')?.value || '',
        status: false,
      }),
    );
    this.form.reset();
  }
}
