import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UncompletedOrdersComponent } from './uncompleted-orders.component';

describe('UncompletedOrdersComponent', () => {
  let component: UncompletedOrdersComponent;
  let fixture: ComponentFixture<UncompletedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UncompletedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UncompletedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
