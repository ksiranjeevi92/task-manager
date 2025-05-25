import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TaskBoardComponent } from '../task-board/task-board.component';

@Component({
  selector: 'app-home-page',
  imports: [HeaderComponent, TaskBoardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
