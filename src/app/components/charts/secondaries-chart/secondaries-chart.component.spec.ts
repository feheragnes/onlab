import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SecondariesChartComponent} from './secondaries-chart.component';

describe('SecondariesChartComponent', () => {
    let component: SecondariesChartComponent;
    let fixture: ComponentFixture<SecondariesChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SecondariesChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SecondariesChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
