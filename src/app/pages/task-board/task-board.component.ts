import { Component, OnInit } from '@angular/core';
import { TaskCardComponent } from '../../components/task/pages/task-card/task-card.component';
import { Task, TaskStatus } from '../../models/task';
import { CreateTaskComponent } from '../../components/task/pages/create-task/create-task.component';

import db from '../../../../db.json';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task-board',
  imports: [TaskCardComponent, CreateTaskComponent],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
})
export class TaskBoardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = db.tasks.map((task) => {
      return {
        ...task,
        status: task.status as TaskStatus,
      };
    });
  }

  addTask(task: Task) {
    let existingtaskIdx = this.tasks.findIndex(
      (existingTask) => existingTask.id === task.id
    );
    console.log(this.tasks);
    console;
    if (existingtaskIdx !== -1) {
      this.tasks[existingtaskIdx] = { ...task };
    } else {
      this.tasks.unshift(task);
    }
  }

  onToggleTaskStatus(taskId: number): void {
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        const newStatus =
          task.status === TaskStatus.OPEN
            ? TaskStatus.COMPLETED
            : TaskStatus.OPEN;
        return { ...task, status: newStatus };
      }
      return task;
    });
  }

  onEditTask(taskId: number): void {
    let task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      this.taskService.taskDataToEdit$.next(task);
    }
  }
}
