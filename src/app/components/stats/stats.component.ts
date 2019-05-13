import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
    constructor() {
    }

    public type = 'tdypg';

    ngOnInit() {
    }

    changeComponent(type: string) {
        this.type = type;
        console.log(type);
    }
}
