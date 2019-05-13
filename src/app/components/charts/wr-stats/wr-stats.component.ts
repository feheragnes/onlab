import {Component, OnInit} from '@angular/core';
import {GamesService} from 'src/app/services/games.service';
import {ChartService} from 'src/app/services/chart.service';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Wr} from 'src/app/interfaces/wr';

@Component({
    selector: 'app-wr-stats',
    templateUrl: './wr-stats.component.html',
    styleUrls: ['./wr-stats.component.css']
})
export class WrStatsComponent implements OnInit {
    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;

    public barChartData: ChartDataSets[] = [
        {data: [], label: 'Yards/Catches'},
        {data: [], label: 'Yards/Games'},
        {data: [], label: 'YardsAfterCatches'}
    ];

    public barChartColors = [
        {
            backgroundColor: '#7986cb'
        }
    ];
    public scatterChartOptions: ChartOptions = {
        responsive: true,
        tooltips: {
            callbacks: {
                label(tooltipItem, data) {
                    const label = data.labels[tooltipItem.index];
                    return (
                        label +
                        ': Yards:' +
                        tooltipItem.xLabel +
                        ', Touchdowns:' +
                        tooltipItem.yLabel
                    );
                }
            }
        }
    };

    public scatterChartType: ChartType = 'scatter';

    public scatterChartLabels: Label[] = [];
    public scatterChartLegend = true;

    public touchdowns: number[] = [];
    public yards: number[] = [];
    public games: number[] = [];

    maxGames: number;
    minGames: number;
    selectedGames = 0;
    wrs: Wr[];
    filteredWrs: Wr[];

    public scatterChartData = [
        {
            data: [],
            pointRadius: 7,
            label: 'Touchdowns/Yards',
            backgroundColor: '#7986cb'
        }
    ];

    seasons = [];
    teams = [];
    selectedSeason = 2018;
    selectedTeam = 'All';

    constructor(
        private chartService: ChartService,
        private gamesService: GamesService
    ) {
    }

    ngOnInit() {
        this.gamesService.getSeasons().subscribe(
            data => {
                this.seasons = data;
                this.getWrs();
            },
            err => console.error(err),
            () => console.log('done loading seasons')
        );
    }

    onSeasonChanged(season: number): void {
        this.selectedSeason = season;
        this.getWrs();
    }

    onTeamChanged(team: string): void {
        this.selectedTeam = team;
        this.filterData(this.selectedGames, this.selectedTeam);
    }

    onGamesSliderChanged(event: any): void {
        this.selectedGames = event.value;
        this.filterData(this.selectedGames, this.selectedTeam);
    }

    getWrs(): void {
        this.chartService.getWrs(this.selectedSeason).subscribe(
            data => {
                this.wrs = data;
                this.teams = Array.from(new Set(data.map((item: any) => item.team)));
                this.teams.push('All');
                this.barChartLabels = data.map(x => x.name + ' (' + x.team + ')');
                this.barChartData[0].data = data.map(x => x.yardsPerCatches);
                this.barChartData[1].data = data.map(x => x.yardsPerGames);
                this.barChartData[2].data = data.map(x => x.yardsAfterCatches);
                this.scatterChartLabels = data.map(x => x.name + ' (' + x.team + ')');
                this.scatterChartData[0].data = [];
                this.touchdowns = data.map(x => x.touchdowns);
                this.yards = data.map(x => x.yards);
                this.games = data.map(x => x.games);
                this.maxGames = Math.max.apply(null, this.games);
                this.minGames = Math.min.apply(null, this.games);
                this.selectedGames = this.minGames;
            },
            err => console.error(err),
            () => {
                console.log('done loading wrs');
                this.scatterChartData[0].data = this.getScatter(
                    this.yards,
                    this.touchdowns,
                    this.scatterChartData[0].data
                );
            }
        );
    }

    getScatter(
        yard: number[],
        td: number[],
        scatterdata: { x: number; y: number }[]
    ): { x: number; y: number }[] {
        scatterdata = [];
        yard.forEach(function(value, i) {
            scatterdata.push({x: value, y: td[i]});
        });
        return scatterdata;
    }

    filterData(g: number, t: string) {
        this.filteredWrs = this.wrs.filter(
            x => x.games >= g && (x.team == t || t == 'All')
        );
        this.barChartLabels = this.filteredWrs.map(
            x => x.name + ' (' + x.team + ')'
        );
        this.barChartData[0].data = this.filteredWrs.map(x => x.yardsPerCatches);
        this.barChartData[1].data = this.filteredWrs.map(x => x.yardsPerGames);
        this.barChartData[2].data = this.filteredWrs.map(x => x.yardsAfterCatches);
        this.scatterChartLabels = this.filteredWrs.map(
            x => x.name + ' (' + x.team + ')'
        );
        this.scatterChartData[0].data = [];
        this.touchdowns = this.filteredWrs.map(x => x.touchdowns);
        this.yards = this.filteredWrs.map(x => x.yards);
        this.games = this.filteredWrs.map(x => x.games);
        this.scatterChartData[0].data = this.getScatter(
            this.yards,
            this.touchdowns,
            this.scatterChartData[0].data
        );
    }
}
