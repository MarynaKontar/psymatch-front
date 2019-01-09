import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassTestButtonComponent } from './pass-test-button.component';

describe('PassTestButtonComponent', () => {
  let component: PassTestButtonComponent;
  let fixture: ComponentFixture<PassTestButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassTestButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassTestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
