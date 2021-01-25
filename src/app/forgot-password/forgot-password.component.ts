import { Component, OnInit } from '@angular/core';
import { NgAuthService } from '../shared/ng-auth.service';

export class PassResetForm{
  public passwordResetEmail: string;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  passResetForm = new PassResetForm();
  error: boolean = false;
  errorMessage: string = "";
  requestSuccessful: boolean = false;

  constructor(public ngAuthService: NgAuthService) { }

  submit(email){
    this.ngAuthService.ForgotPassword(email).then(()=>{
      this.requestSuccessful = true;
    }).catch((error) => {
      this.error = true;
      this.errorMessage = error.message;
    })
  }
  
  ngOnInit(): void {
  }

}
