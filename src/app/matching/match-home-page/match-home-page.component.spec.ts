import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchHomePageComponent } from './match-home-page.component';

describe('MatchHomePageComponent', () => {
  let component: MatchHomePageComponent;
  let fixture: ComponentFixture<MatchHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
