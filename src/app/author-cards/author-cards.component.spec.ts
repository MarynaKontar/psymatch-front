import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorCardsComponent } from './author-cards.component';

describe('AuthorCardsComponent', () => {
  let component: AuthorCardsComponent;
  let fixture: ComponentFixture<AuthorCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
