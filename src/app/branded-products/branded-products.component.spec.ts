import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandedProductsComponent } from './branded-products.component';

describe('BrandedProductsComponent', () => {
  let component: BrandedProductsComponent;
  let fixture: ComponentFixture<BrandedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
