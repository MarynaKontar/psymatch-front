import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFriendButtonComponent } from './test-friend-button.component';

describe('TestFriendButtonComponent', () => {
  let component: TestFriendButtonComponent;
  let fixture: ComponentFixture<TestFriendButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFriendButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFriendButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
