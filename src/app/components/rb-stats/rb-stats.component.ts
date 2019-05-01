import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Rb } from 'src/app/interfaces/rb';
import { ChartService } from 'src/app/services/chart.service';
import { GamesService } from 'src/app/services/games.service';
import { filterQueryId } from '@angular/core/src/view/util';

@Component({
  selector: 'app-rb-stats',
  templateUrl: './rb-stats.component.html',
  styleUrls: ['./rb-stats.component.css']
})
export class RbStatsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Yards/Carrys' },
    { data: [], label: 'Yards/Games' }
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
  public rushAttempts: number[] = [];
  public games: number[] = [];
  maxRa: number;
  minRa: number;
  maxGames: number;
  minGames: number;
  selectedRushAttempts: number;
  selectedGames: number;
  rbs: Rb[];
  filteredRbs: Rb[];

  public scatterChartData = [
    {
      data: [],
      pointRadius: 7,
      label: 'Touchdowns/Yards',
      backgroundColor: '#7986cb'
    }
  ];

  seasons = [];
  selectedSeason = 2018;

  constructor(
    private chartService: ChartService,
    private gamesService: GamesService
  ) {}

  ngOnInit() {
    this.gamesService.getSeasons().subscribe(
      data => {
        this.seasons = data;
        this.getRbs();
      },
      err => console.error(err),
      () => console.log('done loading seasons')
    );
  }

  onSeasonChanged(season: number): void {
    this.selectedSeason = season;
    this.getRbs();
  }

  // onGamesSliderChanged(ra: number): void {
  //   // this.selectedRushAttempts = ra;
  //   this.filterData();
  // }
  // onRaSliderChanged(g: number): void {
  //   // this.selectedGames = g;
  //   this.filterData();
  // }

  getRbs(): void {
    this.chartService.getRbs(this.selectedSeason).subscribe(
      data => {
        this.rbs = data;
        this.rushAttempts = data.map(x => x.rushAttempts);
        this.maxRa = Math.max.apply(null, this.rushAttempts);
        this.minRa = Math.min.apply(null, this.rushAttempts);
        this.games = data.map(x => x.games);
        this.maxGames = Math.max.apply(null, this.games);
        this.minGames = Math.min.apply(null, this.games);
        this.selectedGames = this.minGames;
        this.selectedRushAttempts = this.minRa;

        this.barChartLabels = data.map(x => x.name + ' (' + x.team + ')');
        this.barChartData[0].data = data.map(x => x.yardsPerCarrys);
        this.barChartData[1].data = data.map(x => x.yardsPerGames);
        this.scatterChartLabels = data.map(x => x.name + ' (' + x.team + ')');
        this.scatterChartData[0].data = [];
        this.touchdowns = data.map(x => x.touchdowns);
        this.yards = data.map(x => x.yards);
      },
      err => console.error(err),
      () => {
        console.log('done loading rbs');
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
      scatterdata.push({ x: value, y: td[i] });
    });
    return scatterdata;
  }

  // filterData() {
  //   this.filteredRbs = this.rbs.filter(
  //     x =>
  //       x.games > this.selectedGames &&
  //       x.rushAttempts > this.selectedRushAttempts
  //   );
  //   console.log(this.filteredRbs);
  //   this.barChartData[0].data = this.filteredRbs.map(x => x.yardsPerCarrys);
  //   this.barChartData[1].data = this.filteredRbs.map(x => x.yardsPerGames);
  //   this.scatterChartLabels = this.filteredRbs.map(
  //     x => x.name + ' (' + x.team + ')'
  //   );
  //   this.scatterChartData[0].data = [];
  //   this.touchdowns = this.filteredRbs.map(x => x.touchdowns);
  //   this.yards = this.filteredRbs.map(x => x.yards);
  //   this.scatterChartData[0].data = this.getScatter(
  //     this.yards,
  //     this.touchdowns,
  //     this.scatterChartData[0].data
  //   );
  // }
}