import { Task, Complete } from '../interfaces/task';

export class TaskCreate {
  static readonly type = '[Task]: Task create';
  constructor(public payload: Task) {}
}
export class TaskDelete {
  static readonly type = '[Task]: Task delete';
  constructor(public payload: { id: Task['id'] }) {}
}

export class TaskComplete {
  static readonly type = '[Task]: Task complete';
  constructor(public payload: { id: Task['id']; status: Complete }) {}
}
