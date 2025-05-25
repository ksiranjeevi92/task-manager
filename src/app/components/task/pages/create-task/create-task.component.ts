import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Task } from '../../../../models/task';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent implements OnInit {
  @Input('isEditMode')
  isEditMode: boolean = false;

  @Output() taskCreated = new EventEmitter<Task>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildTaskForm();
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
    return Math.floor(Math.random() * 1000);
  }
}
