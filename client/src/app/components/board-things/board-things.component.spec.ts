import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardThingsComponent } from './board-things.component';

describe('BoardThingsComponent', () => {
  let component: BoardThingsComponent;
  let fixture: ComponentFixture<BoardThingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardThingsComponent]
    });
    fixture = TestBed.createComponent(BoardThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
