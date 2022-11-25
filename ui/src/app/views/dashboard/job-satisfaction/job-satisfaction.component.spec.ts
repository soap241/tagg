import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSatisfactionComponent } from './job-satisfaction.component';

describe('JobSatisfactionComponent', () => {
  let component: JobSatisfactionComponent;
  let fixture: ComponentFixture<JobSatisfactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSatisfactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
