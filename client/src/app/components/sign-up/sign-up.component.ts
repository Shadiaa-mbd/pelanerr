import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  hide = true;
  userRes: User | undefined;
  
  constructor(private fb: FormBuilder, private service:UserService, private http: HttpClient, private router: Router) {
  }

  userFg = this.fb.group({
    nameCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    emailCtrl: ['', [Validators.required, Validators.pattern(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$/)]],
    passwordCtrl: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
  });

  get NameCtrl(): FormControl {
    return this.userFg.get('nameCtrl') as FormControl;
  }
  get EmailCtrl(): FormControl {
    return this.userFg.get('emailCtrl') as FormControl;
  }
  get PasswordCtrl(): FormControl {
    return this.userFg.get('passwordCtrl') as FormControl;
  }

  registerUser(): void{

    let user: User = {
      name: this.NameCtrl.value,
      email: this.EmailCtrl.value,
      password: this.PasswordCtrl.value
    }

    this.http.post<User>('http://localhost:5149/api/user/register', user).subscribe(
      {
        next: res => {
          this.userRes = res;
          if (this.userRes == undefined)
          {
            alert("This email is already registered.")
          }
          else{
            alert("your account created successfully")
            // this.router.navigateByUrl('')
          }
        }
      }
    )
  }

  homeRouter():void{
    this.router.navigateByUrl('')
  }
}

