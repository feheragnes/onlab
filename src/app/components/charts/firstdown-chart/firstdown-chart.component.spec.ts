import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstdownChartComponent } from './firstdown-chart.component';

describe('FirstdownChartComponent', () => {
  let component: FirstdownChartComponent;
  let fixture: ComponentFixture<FirstdownChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstdownChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstdownChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
