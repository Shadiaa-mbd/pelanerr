import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  tasks: Task[] | undefined;
  res: Task | undefined;
  selected: Date | undefined ;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }


  //#region menu

  tasksClick(): void{
    this.router.navigateByUrl('');
  }
  
  calendarClick(): void{
    this.router.navigateByUrl('/calendar')
  }

  personalClick():void{
    this.router.navigateByUrl('/personal-page')
  }

  settingsClick():void{
    this.router.navigateByUrl('/settings')
  }

  //#endregion

  

  dateFg = this.fb.group({
    dateCtrl: [],
  });

  get DateCtrl(): FormControl {
    return this.dateFg.get('dateCtrl') as FormControl;
  }

  getTasks(): void{
    this.http.get<Task[]>('https://localhost:5149/api/task/get-by-date/' + this.DateCtrl.value).subscribe(
      {next: res => this.tasks = res}
    )
    console.log(this.tasks);
  }
}
