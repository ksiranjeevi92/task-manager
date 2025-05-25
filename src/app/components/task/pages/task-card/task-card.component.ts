import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() toggleStatus = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<number>();

  onToggleStatus() {
    this.toggleStatus.emit(this.task.id);
  }

  onDelete() {
    this.deleteTask.emit(this.task.id);
  }

  onEdit() {
    this.editTask.emit(this.task.id);
  }
}
