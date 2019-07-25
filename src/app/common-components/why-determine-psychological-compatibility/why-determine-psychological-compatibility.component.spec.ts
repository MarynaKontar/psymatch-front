import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyDeterminePsychologicalCompatibilityComponent } from './why-determine-psychological-compatibility.component';

describe('WhyDeterminePsychologicalCompatibilityComponent', () => {
  let component: WhyDeterminePsychologicalCompatibilityComponent;
  let fixture: ComponentFixture<WhyDeterminePsychologicalCompatibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyDeterminePsychologicalCompatibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyDeterminePsychologicalCompatibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
