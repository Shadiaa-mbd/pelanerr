import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  category: string[] = ["All", "Work", "Personal", "Birthdays"];
  taskRes: Task | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  taskFg = this.fb.group({
    taskCtrl: [],
    categoryCtrl: [],
    dateCtrl:[]
  });

  get TaskCtrl(): FormControl {
    return this.taskFg.get('taskCtrl') as FormControl;
  }
  get CategoryCtrl(): FormControl {
    return this.taskFg.get('categoryCtrl') as FormControl;
  }
  get DateCtrl(): FormControl {
    return this.taskFg.get('dateCtrl') as FormControl;
  }

  addTask():void {
    
    let task: Task = {
      title: this.TaskCtrl.value,
      category: this.CategoryCtrl?.value,
      date: this.DateCtrl?.value
    }

    this.http.post<Task>('http://localhost:5149/api/task/add-task', task).subscribe(
      {next: res => {
        this.taskRes = res;
        console.log(this.taskRes)
      }}
    );
    window.location.reload()
  }
}

