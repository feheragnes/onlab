import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { Qb } from 'src/app/interfaces/qb';
import { ChartService } from 'src/app/services/chart.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-qb-stats',
  templateUrl: './qb-stats.component.html',
  styleUrls: ['./qb-stats.component.css']
})
export class QbStatsComponent implements OnInit {
  public piChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          return (
            label +
            ': passTouchdowns:' +
            tooltipItem.xLabel +
            ', interceptions:' +
            tooltipItem.yLabel
          );
        }
      }
    }
  };
  public ppChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          return (
            label +
            ': passYards:' +
            tooltipItem.xLabel +
            ', passCmp:' +
            tooltipItem.yLabel
          );
        }
      }
    }
  };
  public ayChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          return (
            label +
            ': airYards:' +
            tooltipItem.xLabel +
            ', yardsPerAttempts:' +
            tooltipItem.yLabel
          );
        }
      }
    }
  };

  public scatterChartType: ChartType = 'scatter';

  public scatterChartLabels: Label[] = [];
  public scatterChartLegend = true;

  public passTouchdowns: number[] = [];
  public interceptions: number[] = [];
  public passYards: number[] = [];
  public passCmp: number[] = [];
  public airYards: number[] = [];
  public yardsPerAttempts: number[] = [];

  public piChartData = [
    {
      data: [],
      pointRadius: 7,
      label: 'PassTouchdowns/Interceptions',
      backgroundColor: '#7986cb'
    }
  ];
  public ppChartData = [
    {
      data: [],
      pointRadius: 7,
      label: 'PassYards/PassCmp',
      backgroundColor: '#7986cb'
    }
  ];

  public ayChartData = [
    {
      data: [],
      pointRadius: 7,
      label: 'AirYards/YardsPerAttempts',
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
        this.getQbs();
      },
      err => console.error(err),
      () => console.log('done loading seasons')
    );
  }

  onSeasonChanged(season: number): void {
    this.selectedSeason = season;
    this.getQbs();
  }

  getQbs(): void {
    this.chartService.getQb(this.selectedSeason).subscribe(
      data => {
        this.scatterChartLabels = data.map(x => x.name + ' (' + x.team + ')');
        this.piChartData[0].data = [];
        this.ppChartData[0].data = [];
        this.ayChartData[0].data = [];
        this.passTouchdowns = data.map(x => x.passTouchdowns);
        this.interceptions = data.map(x => x.interceptions);
        this.passYards = data.map(x => x.passYards);
        this.passCmp = data.map(x => x.passCmp);
        this.airYards = data.map(x => x.airYards);
        this.yardsPerAttempts = data.map(x => x.yardsPerAttempts);
      },
      err => console.error(err),
      () => {
        console.log('done loading qbs');
        this.piChartData[0].data = this.getScatter(
          this.passTouchdowns,
          this.interceptions,
          this.piChartData[0].data
        );
        this.ppChartData[0].data = this.getScatter(
          this.passYards,
          this.passCmp,
          this.ppChartData[0].data
        );
        this.ayChartData[0].data = this.getScatter(
          this.airYards,
          this.yardsPerAttempts,
          this.ayChartData[0].data
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
}
