import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { editcustomerComponent } from './editcustomer.component';

describe('EditcustomerComponent', () => {
  let component: editcustomerComponent;
  let fixture: ComponentFixture<editcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ editcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(editcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should edit', () => {
    expect(component).toBeTruthy();
  });
});
