import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonimRegistrationComponent } from './anonim-registration.component';

describe('AnonimRegistrationComponent', () => {
  let component: AnonimRegistrationComponent;
  let fixture: ComponentFixture<AnonimRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonimRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonimRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
