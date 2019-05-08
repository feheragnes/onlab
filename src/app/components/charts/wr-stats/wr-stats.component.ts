import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { ChartService } from 'src/app/services/chart.service';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';

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
    { data: [], label: 'Yards/Catches' },
    { data: [], label: 'Yards/Games' },
    { data: [], label: 'YardsAfterCatches' }
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

  getWrs(): void {
    this.chartService.getWrs(this.selectedSeason).subscribe(
      data => {
        this.barChartLabels = data.map(x => x.name + ' (' + x.team + ')');
        this.barChartData[0].data = data.map(x => x.yardsPerCatches);
        this.barChartData[1].data = data.map(x => x.yardsPerGames);
        this.barChartData[2].data = data.map(x => x.yardsAfterCatches);
        this.scatterChartLabels = data.map(x => x.name + ' (' + x.team + ')');
        this.scatterChartData[0].data = [];
        this.touchdowns = data.map(x => x.touchdowns);
        this.yards = data.map(x => x.yards);
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
      scatterdata.push({ x: value, y: td[i] });
    });
    return scatterdata;
  }
}
