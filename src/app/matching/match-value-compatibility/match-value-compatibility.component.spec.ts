import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchValueCompatibilityComponent } from './match-value-compatibility.component';

describe('MatchValueCompatibilityComponent', () => {
  let component: MatchValueCompatibilityComponent;
  let fixture: ComponentFixture<MatchValueCompatibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchValueCompatibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchValueCompatibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
