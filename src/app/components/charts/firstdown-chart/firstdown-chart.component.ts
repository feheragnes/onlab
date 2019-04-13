import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { FirstDown } from 'src/app/interfaces/firstdown';
import { ChartService } from 'src/app/services/chart.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-firstdown-chart',
  templateUrl: './firstdown-chart.component.html',
  styleUrls: ['./firstdown-chart.component.css']
})
export class FirstdownChartComponent implements OnInit {
  secondaries: FirstDown[] = [];
  seasons = [];
  selectedSeason = 2018;

  public scatterChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          return (
            label +
            ': YPA:' +
            tooltipItem.xLabel +
            ', First Downs:' +
            tooltipItem.yLabel
          );
        }
      }
    }
  };

  public scatterChartType: ChartType = 'scatter';

  public scatterChartLabels: Label[] = [];
  public scatterChartLegend = true;

  public ypa: number[] = [];
  public firstDowns: number[] = [];

  public scatterChartData = [
    {
      data: [],
      pointRadius: 7,
      label: 'FirstDowns',
      backgroundColor: '#9280E3'
    }
  ];

  constructor(
    private chartService: ChartService,
    private gamesService: GamesService
  ) {}

  ngOnInit() {
    this.gamesService.getSeasons().subscribe(
      d => {
        this.seasons = d;
        this.getFirstDowns();
      },
      err => console.error(err),
      () => console.log('done loading seasons')
    );
  }

  onSeasonChanged(season: number): void {
    this.selectedSeason = season;
    this.getFirstDowns();
  }

  getScatter(
    ypa: number[],
    firstDowns: number[],
    scatterdata: { x: number; y: number }[]
  ): { x: number; y: number }[] {
    scatterdata = [];
    ypa.forEach(function(value, i) {
      scatterdata.push({ x: value, y: firstDowns[i] });
    });
    return scatterdata;
  }

  getFirstDowns(): void {
    this.chartService.getFirstDowns(this.selectedSeason).subscribe(
      d => {
        this.scatterChartData[0].data = [];
        this.scatterChartLabels = d.map(x => x.team);
        this.ypa = d.map(x => x.ypa);
        this.firstDowns = d.map(x => x.firstDowns);
      },
      err => console.error(err),
      () => {
        console.log('done loading firstdowns');
        this.scatterChartData[0].data = this.getScatter(
          this.ypa,
          this.firstDowns,
          this.scatterChartData[0].data
        );
      }
    );
  }
}
