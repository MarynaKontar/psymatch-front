import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCompatibilityComponent } from './value-compatibility.component';

describe('ValueCompatibilityComponent', () => {
  let component: ValueCompatibilityComponent;
  let fixture: ComponentFixture<ValueCompatibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueCompatibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueCompatibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
