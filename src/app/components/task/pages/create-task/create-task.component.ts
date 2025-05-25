import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../../../../models/task';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../../../services/task/task.service';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  isEditMode: boolean = false;

  @Output() taskCreated = new EventEmitter<Task>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.buildTaskForm();
    this.taskService.taskDataToEdit$.subscribe((data: Task) => {
      this.isEditMode = true;
      this.taskForm.reset();
      this.taskForm.setValue({ ...data });
    });
  }

  private buildTaskForm(): void {
    this.taskForm = this.fb.group({
      id: new FormControl(this.genId()),
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [Validators.maxLength(255)]),
      status: new FormControl('Open', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
    });
  }

  get title() {
    return this.taskForm.get('title');
  }

  get dueDate() {
    return this.taskForm.get('dueDate');
  }

  createTask() {
    if (this.taskForm.valid) {
      this.taskCreated.emit({ ...this.taskForm.value });
      this.resetForm();
      this.isEditMode = false;
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  resetForm() {
    let task = {
      id: this.genId(),
      title: '',
      description: '',
      status: 'Open',
      dueDate: '',
    };
    this.taskForm.reset();
    this.taskForm.setValue(task);
  }

  private genId(): number {
    return Date.now();
  }
}
