import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RbStatsComponent} from './rb-stats.component';

describe('RbStatsComponent', () => {
    let component: RbStatsComponent;
    let fixture: ComponentFixture<RbStatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RbStatsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RbStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
