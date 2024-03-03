import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlContentComponent } from './fl-content.component';

describe('FlContentComponent', () => {
  let component: FlContentComponent;
  let fixture: ComponentFixture<FlContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlContentComponent]
    });
    fixture = TestBed.createComponent(FlContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
