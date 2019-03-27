import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNotPassedComponent } from './test-not-passed.component';

describe('TestNotPassedComponent', () => {
  let component: TestNotPassedComponent;
  let fixture: ComponentFixture<TestNotPassedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNotPassedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNotPassedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
