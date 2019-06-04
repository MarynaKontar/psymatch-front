import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToFriendAccountComponent } from './return-to-friend-account.component';

describe('ReturnToFriendAccountComponent', () => {
  let component: ReturnToFriendAccountComponent;
  let fixture: ComponentFixture<ReturnToFriendAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnToFriendAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnToFriendAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
