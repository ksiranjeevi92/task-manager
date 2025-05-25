import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskDataToEdit$: Subject<Task> = new Subject();

  constructor() {}
}
