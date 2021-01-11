import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/shared/ng-auth.service.ts.service';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

    constructor(public ngAuthService: NgAuthService) { }

    ngOnInit() {
       
    }

    
}
