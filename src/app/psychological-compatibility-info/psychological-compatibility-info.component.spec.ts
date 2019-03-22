import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologicalCompatibilityInfoComponent } from './psychological-compatibility-info.component';

describe('PsychologicalCompatibilityInfoComponent', () => {
  let component: PsychologicalCompatibilityInfoComponent;
  let fixture: ComponentFixture<PsychologicalCompatibilityInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologicalCompatibilityInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologicalCompatibilityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
