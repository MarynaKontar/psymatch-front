import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInfoCardsComponent } from './test-info-cards.component';

describe('TestInfoCardsComponent', () => {
  let component: TestInfoCardsComponent;
  let fixture: ComponentFixture<TestInfoCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInfoCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
