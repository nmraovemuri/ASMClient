import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDealsoftheDayComponent } from './top-dealsofthe-day.component';

describe('TopDealsoftheDayComponent', () => {
  let component: TopDealsoftheDayComponent;
  let fixture: ComponentFixture<TopDealsoftheDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopDealsoftheDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDealsoftheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
