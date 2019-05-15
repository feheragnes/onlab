import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';
import { GamesService } from 'src/app/services/games.service';
import { TdYpg } from 'src/app/interfaces/tdypg';
import { Point } from 'src/app/interfaces/point';
import { all } from 'q';

@Component({
  selector: 'app-td-ypg-chart',
  templateUrl: './td-ypg-chart.component.html',
  styleUrls: ['./td-ypg-chart.component.css']
})
export class TdYpgChartComponent implements OnInit {
  constructor(
    private chartService: ChartService,
    private gamesService: GamesService
  ) {}
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
      pointBackgroundColor: [],
      pointBorderColor: [],
      pointRadius: 7,
      label: 'TD-YPG'
    }
  ];

  tdypgs: TdYpg[] = [];
  seasons = [];
  selectedSeason = 2018;
  selectedAllowedScored = 'allowed';
  selectedType = 'all';
  selectedTeam = 'Nincs';
  teams = [];
  allTeams = [];

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

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

  getColors(length: number, pointColor: string[]): void {
    for (let _i = 0; _i < length; _i++) {
      pointColor.push('#7986cb');
    }
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
        this.allTeams = d.map(x => x.team);
        this.teams = Array.from(new Set(d.map((item: any) => item.team)));
        this.teams.push('Nincs');
      },
      err => console.error(err),
      () => {
        console.log('done loading tdypg');
        this.changeData();
        this.getColors(
          this.scatterChartData[0].data.length,
          this.scatterChartData[0].pointBackgroundColor
        );
      }
    );
  }

  teamClicked(team: string): void {
    this.selectedTeam = team;
    // this.colorChange(team, this.scatterChartData[0].pointBackgroundColor);
    if (team != 'Nincs') {
      this.allTeams.forEach((item, index) => {
        if (item == team) {
          this.scatterChartData[0].pointBackgroundColor[index] = '#A5121F';
        }
      });
      this.updateChart();
    } else {
      this.scatterChartData[0].pointBackgroundColor.forEach((item, index) => {
        this.scatterChartData[0].pointBackgroundColor[index] = '#7986cb';
      });
      this.updateChart();
    }
  }

  updateChart() {
    this.chart.chart.update(); // This re-renders the canvas element.
  }
}
