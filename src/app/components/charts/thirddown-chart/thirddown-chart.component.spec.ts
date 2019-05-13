import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThirddownChartComponent} from './thirddown-chart.component';

describe('ThirddownChartComponent', () => {
    let component: ThirddownChartComponent;
    let fixture: ComponentFixture<ThirddownChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThirddownChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThirddownChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
