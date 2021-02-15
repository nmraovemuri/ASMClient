import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordStatusComponent } from './forgot-password-status.component';

describe('ForgotPasswordStatusComponent', () => {
  let component: ForgotPasswordStatusComponent;
  let fixture: ComponentFixture<ForgotPasswordStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
