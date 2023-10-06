import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  hide = true;
  userRes: User | undefined;
  
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  userFg = this.fb.group({
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  });

  get EmailCtrl(): FormControl {
    return this.userFg.get('emailCtrl') as FormControl;
  }
  get PasswordCtrl(): FormControl {
    return this.userFg.get('passwordCtrl') as FormControl;
  }

  loginUser():void {
    this.http.get<User>('http://localhost:5149/api/user/login/' + this.EmailCtrl.value + '/' + this.PasswordCtrl.value).subscribe(
      {
        next: res => {
          this.userRes = res
          if (this.userRes == undefined)
          {
            alert("We coulden't find your profile Please check your email and password again")
          }
          else{
            alert("welcome!")
            this.router.navigateByUrl('');
          } 
        }
      }
    )
  }
}
