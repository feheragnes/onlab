import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QbStatsComponent} from './qb-stats.component';

describe('QbStatsComponent', () => {
    let component: QbStatsComponent;
    let fixture: ComponentFixture<QbStatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QbStatsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QbStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
