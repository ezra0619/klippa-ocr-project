import { Component, OnInit } from '@angular/core';
import { NgAuthService } from 'src/app/shared/ng-auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(public ngAuthService: NgAuthService) { }

  ngOnInit(): void {
  }


  toggleSideNav(){
    if(document.getElementById('side-nav-container').classList.contains('col-2')=== true){

      document.getElementById('side-nav-container').classList.remove('col-2');
      document.getElementById('side-nav-container').classList.add('hideContent');

    }else if(document.getElementById('side-nav-container').classList.contains('hideContent')=== true){
      document.getElementById('side-nav-container').classList.remove('hideContent');
      document.getElementById('side-nav-container').classList.add('col-2');
    };
  }
}
