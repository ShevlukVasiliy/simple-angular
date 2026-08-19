import { Component, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { TasksState } from '../store/tasks.state';
import { KeyValuePipe, NgClass } from '@angular/common';
import { Complete, Task } from '../interfaces/task';
import { TaskComplete, TaskDelete } from '../store/tasks.model';

@Component({
  selector: 'app-tasks-list',
  imports: [KeyValuePipe, NgClass],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList {
  public tasks = signal<{ [k: string]: Task }>({});
  constructor(public store: Store) {
    this.store.select(TasksState.getTasks).subscribe({
      next: (val) => {
        this.tasks.update(() => val);
      },
    });
  }

  public deleteTask(id: string) {
    this.store.dispatch(new TaskDelete({ id }));
  }

  public completeTask(id: string, value: Complete) {
    this.store.dispatch(new TaskComplete({ id, status: value }));
  }
}
