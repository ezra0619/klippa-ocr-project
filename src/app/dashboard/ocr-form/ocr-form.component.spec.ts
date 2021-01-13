import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrFormComponent } from './ocr-form.component';

describe('OcrFormComponent', () => {
  let component: OcrFormComponent;
  let fixture: ComponentFixture<OcrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcrFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
