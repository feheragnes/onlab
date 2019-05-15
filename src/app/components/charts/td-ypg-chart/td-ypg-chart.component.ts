import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';
import { GamesService } from 'src/app/services/games.service';
import { TdYpg } from 'src/app/interfaces/tdypg';
import { Point } from 'src/app/interfaces/point';

@Component({
  selector: 'app-td-ypg-chart',
  templateUrl: './td-ypg-chart.component.html',
  styleUrls: ['./td-ypg-chart.component.css']
})
export class TdYpgChartComponent implements OnInit {
  public scatterChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          return (
            label + ': Td:' + tooltipItem.xLabel + ', Ypg:' + tooltipItem.yLabel
          );
        }
      }
    }
  };

  public scatterChartType: ChartType = 'scatter';

  public scatterChartLabels: Label[] = [];
  public scatterChartLegend = false;

  allowedAllTd: number[] = [];
  scoredAllTd: number[] = [];
  allowedRushingTd: number[] = [];
  scoredRushingTd: number[] = [];
  allowedReceivingTd: number[] = [];
  scoredReceivingTd: number[] = [];
  allowedAllYpg: number[] = [];
  scoredAllYpg: number[] = [];
  allowedRushingYpg: number[] = [];
  scoredRushingYpg: number[] = [];
  allowedReceivingYpg: number[] = [];
  scoredReceivingYpg: number[] = [];

  public scatterChartData = [
    {
      data: [],
      pointRadius: 7,
      label: 'TD-YPG',
      backgroundColor: '#7986cb'
    }
  ];

  tdypgs: TdYpg[] = [];
  seasons = [];
  selectedSeason = 2018;
  selectedAllowedScored = 'allowed';
  selectedType = 'all';

  constructor(
    private chartService: ChartService,
    private gamesService: GamesService
  ) {}

  ngOnInit() {
    this.gamesService.getSeasons().subscribe(
      d => {
        this.seasons = d;
        this.getTdYpg();
      },
      err => console.error(err),
      () => console.log('done loading seasons')
    );
  }

  onSeasonChanged(season: number): void {
    this.selectedSeason = season;
    this.getTdYpg();
  }

  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: Point[];
  }): void {
    if (active[0] != null) {
      console.log(active);
      const segment = active[0];
      console.log(segment._model.backgroundColor);
      segment._model.backgroundColor = 'rgb(1, 1, 1)';
      segment._view.backgroundColor = 'rgb(1, 1, 1)';
      segment._options.backgroundColor = 'rgb(1, 1, 1)';
    }
  }

  changeData(): void {
    if (this.selectedAllowedScored == 'allowed' && this.selectedType == 'all') {
      this.scatterChartData[0].data = this.getScatter(
        this.allowedAllTd,
        this.allowedAllYpg,
        this.scatterChartData[0].data
      );
    } else if (
      this.selectedAllowedScored == 'scored' &&
      this.selectedType == 'all'
    ) {
      this.scatterChartData[0].data = this.getScatter(
        this.scoredAllTd,
        this.scoredAllYpg,
        this.scatterChartData[0].data
      );
    } else if (
      this.selectedAllowedScored == 'allowed' &&
      this.selectedType == 'rushing'
    ) {
      this.scatterChartData[0].data = this.getScatter(
        this.allowedRushingTd,
        this.allowedRushingYpg,
        this.scatterChartData[0].data
      );
    } else if (
      this.selectedAllowedScored == 'scored' &&
      this.selectedType == 'rushing'
    ) {
      this.scatterChartData[0].data = this.getScatter(
        this.scoredRushingTd,
        this.scoredRushingYpg,
        this.scatterChartData[0].data
      );
    } else if (
      this.selectedAllowedScored == 'allowed' &&
      this.selectedType == 'receiving'
    ) {
      this.scatterChartData[0].data = this.getScatter(
        this.allowedReceivingTd,
        this.allowedReceivingYpg,
        this.scatterChartData[0].data
      );
    } else if (
      this.selectedAllowedScored == 'scored' &&
      this.selectedType == 'receiving'
    ) {
      this.scatterChartData[0].data = this.getScatter(
        this.scoredReceivingTd,
        this.scoredReceivingYpg,
        this.scatterChartData[0].data
      );
    }
  }

  onAllowedScoredChanged(value: string): void {
    this.selectedAllowedScored = value;
    this.changeData();
  }

  onTypeChanged(value: string): void {
    this.selectedType = value;
    this.changeData();
  }

  getScatter(
    td: number[],
    ypg: number[],
    scatterdata: { x: number; y: number }[]
  ): { x: number; y: number }[] {
    scatterdata = [];
    td.forEach(function(value, i) {
      scatterdata.push({ x: value, y: ypg[i] });
    });
    return scatterdata;
  }

  getTdYpg(): void {
    this.chartService.getTdYpg(this.selectedSeason).subscribe(
      d => {
        this.scatterChartData[0].data = [];
        this.scatterChartLabels = d.map(x => x.team);
        this.allowedAllTd = d.map(x => x.allowedAllTd);
        this.scoredAllTd = d.map(x => x.scoredAllTd);
        this.allowedRushingTd = d.map(x => x.allowedRushingTd);
        this.scoredRushingTd = d.map(x => x.scoredRushingTd);
        this.allowedReceivingTd = d.map(x => x.allowedReceivingTd);
        this.scoredReceivingTd = d.map(x => x.scoredReceivingTd);
        this.allowedAllYpg = d.map(x => x.allowedAllYpg);
        this.scoredAllYpg = d.map(x => x.scoredAllYpg);
        this.allowedRushingYpg = d.map(x => x.allowedRushingYpg);
        this.scoredRushingYpg = d.map(x => x.scoredRushingYpg);
        this.allowedReceivingYpg = d.map(x => x.allowedReceivingYpg);
        this.scoredReceivingYpg = d.map(x => x.scoredReceivingYpg);
      },
      err => console.error(err),
      () => {
        console.log('done loading tdypg');
        this.changeData();
      }
    );
  }
}
