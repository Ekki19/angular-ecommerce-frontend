import { Component } from '@angular/core';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { LoginRequest } from 'src/app/common/login-request';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password: any;
  username: any;

  constructor(private auth: AuthenticationService) {}

  userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  
  request: LoginRequest = new LoginRequest;

  login() {
    const formValue = this.userForm.value;

    console.log('formValue USERNAME: ' + formValue.username);
    console.log('formValue PASSWORD: ' + formValue.password);


    if(formValue.username == '' || formValue.password == ''){
      alert('Username or Password is empty!');
      return;
    }

    this.request.username = formValue.username;
    this.request.password = formValue.password;

     this.auth.login(this.request).subscribe({
      next:(res) => {
        console.log('Response: ' + res.token);
      }, error: (err) => {
        console.log('Error received while logging in: ' + err);
      }
     })
  }
}
