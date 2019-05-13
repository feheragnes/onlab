import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {Secondary} from 'src/app/interfaces/secondary';
import {ChartService} from 'src/app/services/chart.service';
import {GamesService} from 'src/app/services/games.service';

@Component({
    selector: 'app-secondaries-chart',
    templateUrl: './secondaries-chart.component.html',
    styleUrls: ['./secondaries-chart.component.css']
})
export class SecondariesChartComponent implements OnInit {
    public scatterChartOptions: ChartOptions = {
        responsive: true,
        tooltips: {
            callbacks: {
                label(tooltipItem, data) {
                    const label = data.labels[tooltipItem.index];
                    return (
                        label +
                        ': Interceptions:' +
                        tooltipItem.xLabel +
                        ', Fumbles:' +
                        tooltipItem.yLabel
                    );
                }
            }
        }
    };

    public scatterChartType: ChartType = 'scatter';

    public scatterChartLabels: Label[] = [];
    public scatterChartLegend = true;

    public interceptions: number[] = [];
    public fumbles: number[] = [];

    public scatterChartData = [
        {
            data: [],
            pointRadius: 7,
            label: 'Secondaries',
            backgroundColor: '#64D189'
        }
    ];

    secondaries: Secondary[] = [];
    seasons = [];
    selectedSeason = 2018;

    constructor(
        private chartService: ChartService,
        private gamesService: GamesService
    ) {
    }

    ngOnInit() {
        this.gamesService.getSeasons().subscribe(
            d => {
                this.seasons = d;
                this.getSecondaries();
            },
            err => console.error(err),
            () => console.log('done loading seasons')
        );
    }

    onSeasonChanged(season: number): void {
        this.selectedSeason = season;
        this.getSecondaries();
    }

    getScatter(
        interceptions: number[],
        fumbles: number[],
        scatterdata: { x: number; y: number }[]
    ): { x: number; y: number }[] {
        scatterdata = [];
        interceptions.forEach(function(value, i) {
            scatterdata.push({x: value, y: fumbles[i]});
        });
        return scatterdata;
    }

    getSecondaries(): void {
        this.chartService.getSecondaries(this.selectedSeason).subscribe(
            d => {
                this.scatterChartData[0].data = [];
                this.scatterChartLabels = d.map(x => x.team);
                this.interceptions = d.map(x => x.interceptions);
                this.fumbles = d.map(x => x.fumbles);
            },
            err => console.error(err),
            () => {
                console.log('done loading secondaries');
                this.scatterChartData[0].data = this.getScatter(
                    this.interceptions,
                    this.fumbles,
                    this.scatterChartData[0].data
                );
            }
        );
    }
}
