import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContentComponent } from './customer-content.component';

describe('CustomerContentComponent', () => {
  let component: CustomerContentComponent;
  let fixture: ComponentFixture<CustomerContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerContentComponent]
    });
    fixture = TestBed.createComponent(CustomerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
