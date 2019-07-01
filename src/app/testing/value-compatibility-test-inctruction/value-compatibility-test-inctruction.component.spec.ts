import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCompatibilityTestInctructionComponent } from './value-compatibility-test-inctruction.component';

describe('ValueCompatibilityTestInctructionComponent', () => {
  let component: ValueCompatibilityTestInctructionComponent;
  let fixture: ComponentFixture<ValueCompatibilityTestInctructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueCompatibilityTestInctructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueCompatibilityTestInctructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
