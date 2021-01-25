import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/shared/ng-auth.service';

export class SignInForm {
  public userName: string;
  public userPassword: string;
}

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  error: boolean = false;
  errorMessage: string = "";
  signInForm = new SignInForm();

  constructor(public ngAuthService: NgAuthService) { }

  submit(email, password){
    this.ngAuthService.SignIn(email, password).catch((error) => {
      this.error = true;
      this.errorMessage = error.message;
    })
  }

  ngOnInit(): void {
  }

}
