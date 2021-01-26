import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageNotFoundComponent } from './dashboard-page-not-found.component';

describe('DashboardPageNotFoundComponent', () => {
  let component: DashboardPageNotFoundComponent;
  let fixture: ComponentFixture<DashboardPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPageNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
