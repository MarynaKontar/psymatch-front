import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHomePageComponent } from './test-home-page.component';

describe('TestHomePageComponent', () => {
  let component: TestHomePageComponent;
  let fixture: ComponentFixture<TestHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
