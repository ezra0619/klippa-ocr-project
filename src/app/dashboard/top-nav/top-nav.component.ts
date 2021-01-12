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

}
