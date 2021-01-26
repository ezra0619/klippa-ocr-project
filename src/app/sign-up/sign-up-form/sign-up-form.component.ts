import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/shared/authentication/ng-auth.service';

export class SignUpForm {
  userEmail: string;
  userPwd: string;
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

    signUpForm = new SignUpForm();
    error: boolean = false;
    errorMessage:string = ""; 

    constructor(public ngAuthService: NgAuthService) { }

    submit(email, password){
      this.ngAuthService.SignUp(email, password).catch((error)=> {
        this.error = true;
        this.errorMessage = error.message;
      })
    }
    
    ngOnInit() {
       
    }

    
}
