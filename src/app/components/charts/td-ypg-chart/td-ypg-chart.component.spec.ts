import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdYpgChartComponent } from './td-ypg-chart.component';

describe('TdYpgChartComponent', () => {
  let component: TdYpgChartComponent;
  let fixture: ComponentFixture<TdYpgChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdYpgChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdYpgChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
