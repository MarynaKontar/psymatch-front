import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFriendComponent } from './test-friend.component';

describe('TestFriendComponent', () => {
  let component: TestFriendComponent;
  let fixture: ComponentFixture<TestFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
