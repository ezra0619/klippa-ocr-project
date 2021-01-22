import { Component, OnInit } from '@angular/core';
import { NgAuthService } from '../../shared/ng-auth.service.ts.service';

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
      document.getElementById('main-information-container').classList.remove('col-10');
      document.getElementById('main-information-container').classList.add('col-12');

    }else if(document.getElementById('side-nav-container').classList.contains('hideContent')=== true){
      document.getElementById('side-nav-container').classList.remove('hideContent');
      document.getElementById('side-nav-container').classList.add('col-2');
      document.getElementById('main-information-container').classList.remove('col-12');
      document.getElementById('main-information-container').classList.add('col-10');
    };
  }
}
