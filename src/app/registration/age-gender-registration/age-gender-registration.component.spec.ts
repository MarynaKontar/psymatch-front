import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeSexRegistrationComponent } from './age-gender-registration.component';

describe('AgeSexRegistrationComponent', () => {
  let component: AgeSexRegistrationComponent;
  let fixture: ComponentFixture<AgeSexRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeSexRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeSexRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
