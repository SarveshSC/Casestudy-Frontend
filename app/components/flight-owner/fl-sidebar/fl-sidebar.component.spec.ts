import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlSidebarComponent } from './fl-sidebar.component';

describe('FlSidebarComponent', () => {
  let component: FlSidebarComponent;
  let fixture: ComponentFixture<FlSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlSidebarComponent]
    });
    fixture = TestBed.createComponent(FlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
