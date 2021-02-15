import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStatusComponent } from './signup-status.component';

describe('SignupStatusComponent', () => {
  let component: SignupStatusComponent;
  let fixture: ComponentFixture<SignupStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
