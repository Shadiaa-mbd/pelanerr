import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-personal-page',
  templateUrl: './user-personal-page.component.html',
  styleUrls: ['./user-personal-page.component.scss']
})
export class UserPersonalPageComponent {

  constructor(private router: Router) { }

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

  routToSignUp():void{
    this.router.navigateByUrl('/sign-up')
  }
}
