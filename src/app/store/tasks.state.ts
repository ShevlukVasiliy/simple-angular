import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Store, Task } from '../interfaces/task';
import { TaskComplete, TaskCreate, TaskDelete } from './tasks.model';

@State<Store>({
  name: 'TasksState',
  defaults: { tasks: {} },
})
@Injectable()
export class TasksState {
  @Selector()
  static getTasks(state: Store) {
    return state.tasks;
  }

  @Action(TaskCreate)
  createTask(ctx: StateContext<Store>, action: TaskCreate) {
    var tasks = ctx.getState().tasks;
    var taskId = action.payload.id;
    var taskData = action.payload;
    var newTasks = { ...tasks, [taskId]: taskData };

    ctx.patchState({
      tasks: newTasks,
    });
  }

  @Action(TaskDelete)
  deleteTask(ctx: StateContext<Store>, action: TaskDelete) {
    var tasks = ctx.getState().tasks;
    var taskId = action.payload.id;
    delete tasks[taskId];

    ctx.patchState({
      tasks: tasks,
    });
  }

  @Action(TaskComplete)
  completeTask(ctx: StateContext<Store>, action: TaskComplete) {
    var tasks = ctx.getState().tasks;
    var taskId = action.payload.id;
    var status = action.payload.status;

    ctx.patchState({
      tasks: {
        ...tasks,
        [taskId]: {
          ...tasks[taskId],
          status,
        },
      },
    });
  }
}
