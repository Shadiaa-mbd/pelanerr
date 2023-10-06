import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  res: Task | undefined;
  checked = false;

  category: string[] = ["All", "Work", "Personal", "Birthday"];
  tasks: Task[] | undefined;

  constructor(private dialog : MatDialog, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.showTasks()
  }

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

  openDialog() {
    const dialogRef =  this.dialog.open(DialogComponent, {
      width:'35%',
      height:'26%'
    });
    dialogRef.updatePosition({
      right: '9rem',
      bottom: '2rem'
    })
  }

  showTasks():void{
    this.http.get<Task[]>('http://localhost:5149/api/task/get-all').subscribe(
      {next: res => this.tasks = res}
    )
  }

  deleteTask(i: number): void {
    this.tasks?.splice(i, 1);
    this.http.delete<Task[]>('http://localhost:5149/api/task/delete-task/').subscribe({
      next: res => console.log(res)
    })
  }
}
