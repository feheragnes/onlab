import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrStatsComponent } from './wr-stats.component';

describe('WrStatsComponent', () => {
  let component: WrStatsComponent;
  let fixture: ComponentFixture<WrStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
