import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationCardComponent } from './documentation-card.component';

describe('DocumentationCardComponent', () => {
  let component: DocumentationCardComponent;
  let fixture: ComponentFixture<DocumentationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
