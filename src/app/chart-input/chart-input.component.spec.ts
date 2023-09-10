import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInputComponent } from './chart-input.component';

describe('ChartInputComponent', () => {
  let component: ChartInputComponent;
  let fixture: ComponentFixture<ChartInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChartInputComponent]
    });
    fixture = TestBed.createComponent(ChartInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
