import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingTokensComponent } from './sending-tokens.component';

describe('SendingTokensComponent', () => {
  let component: SendingTokensComponent;
  let fixture: ComponentFixture<SendingTokensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingTokensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
