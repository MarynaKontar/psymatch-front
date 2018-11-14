import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCompatibilityProfileComponent } from './value-compatibility-profile.component';

describe('ValueCompatibilityProfileComponent', () => {
  let component: ValueCompatibilityProfileComponent;
  let fixture: ComponentFixture<ValueCompatibilityProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueCompatibilityProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueCompatibilityProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
