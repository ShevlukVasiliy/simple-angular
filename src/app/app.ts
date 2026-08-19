import { Component } from '@angular/core';
import { AddTask } from './add-task/add-task';
import { TasksList } from './tasks-list/tasks-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [AddTask, TasksList],
})
export class App {}
