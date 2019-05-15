import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';
import { GamesService } from 'src/app/services/games.service';
import { Dline } from 'src/app/interfaces/dline';

@Component({
  selector: 'app-dlines-chart',
  templateUrl: './dlines-chart.component.html',
  styleUrls: ['./dlines-chart.component.css']
})
export class DlinesChartComponent implements OnInit {
  public scatterChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          return (
            label +
            ': Sacks:' +
            tooltipItem.xLabel +
            ', Qbhits:' +
            tooltipItem.yLabel
          );
        }
      }
    }
  };

  public scatterChartType: ChartType = 'scatter';

  public scatterChartLabels: Label[] = [];
  public scatterChartLegend = false;

  public sacks: number[] = [];
  public qbhits: number[] = [];

  public scatterChartData = [
    {
      data: [],
      pointRadius: 7,
      label: 'D-lines',
      backgroundColor: '#7986cb'
    }
  ];

  dlines: Dline[] = [];
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
        this.getDlines();
      },
      err => console.error(err),
      () => console.log('done loading seasons')
    );
  }

  onSeasonChanged(season: number): void {
    this.selectedSeason = season;
    this.getDlines();
  }

  getScatter(
    qbhits: number[],
    sacks: number[],
    scatterdata: { x: number; y: number }[]
  ): { x: number; y: number }[] {
    scatterdata = [];
    sacks.forEach(function(value, i) {
      scatterdata.push({ x: value, y: qbhits[i] });
    });
    return scatterdata;
  }

  getDlines(): void {
    this.chartService.getDlines(this.selectedSeason).subscribe(
      d => {
        this.scatterChartData[0].data = [];
        this.scatterChartLabels = d.map(x => x.team);
        this.qbhits = d.map(x => x.qb_hits);
        this.sacks = d.map(x => x.sacks);
      },
      err => console.error(err),
      () => {
        console.log('done loading dlines');
        this.scatterChartData[0].data = this.getScatter(
          this.qbhits,
          this.sacks,
          this.scatterChartData[0].data
        );
      }
    );
  }
}
