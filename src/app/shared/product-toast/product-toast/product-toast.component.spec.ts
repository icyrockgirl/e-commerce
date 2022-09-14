import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductToastComponent } from './product-toast.component';

describe('ProductToastComponent', () => {
  let component: ProductToastComponent;
  let fixture: ComponentFixture<ProductToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
