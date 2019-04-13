import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlinesChartComponent } from './dlines-chart.component';

describe('DlinesChartComponent', () => {
  let component: DlinesChartComponent;
  let fixture: ComponentFixture<DlinesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlinesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlinesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
