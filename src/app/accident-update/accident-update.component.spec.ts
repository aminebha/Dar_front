import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentUpdateComponent } from './accident-update.component';

describe('AccidentUpdateComponent', () => {
  let component: AccidentUpdateComponent;
  let fixture: ComponentFixture<AccidentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccidentUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
