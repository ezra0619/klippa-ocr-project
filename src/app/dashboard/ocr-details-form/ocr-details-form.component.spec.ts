import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrDetailsFormComponent } from './ocr-details-form.component';

describe('OcrDetailsFormComponent', () => {
  let component: OcrDetailsFormComponent;
  let fixture: ComponentFixture<OcrDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcrDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
