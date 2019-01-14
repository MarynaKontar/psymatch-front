import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeGenderRegistrationComponent } from './age-gender-registration.component';

describe('AgeGenderRegistrationComponent', () => {
  let component: AgeGenderRegistrationComponent;
  let fixture: ComponentFixture<AgeGenderRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeGenderRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeGenderRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
