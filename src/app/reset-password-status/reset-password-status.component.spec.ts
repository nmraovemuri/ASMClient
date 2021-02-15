import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordStatusComponent } from './reset-password-status.component';

describe('ResetPasswordStatusComponent', () => {
  let component: ResetPasswordStatusComponent;
  let fixture: ComponentFixture<ResetPasswordStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
