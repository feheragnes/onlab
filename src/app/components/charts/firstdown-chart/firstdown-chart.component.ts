import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
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
  seasons = [];
  selectedSeason = 2018;

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
  public barChartLegend = false;

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Firstdown' }];

  public barChartColors = [
    {
      backgroundColor: '#7986cb'
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

  getFirstDowns(): void {
    this.chartService.getFirstDowns(this.selectedSeason).subscribe(
      d => {
        this.barChartData[0].data = [];
        this.barChartLabels = d.map(x => x.team);
        this.barChartData[0].data = d.map(x => x.firstDowns);
      },
      err => console.error(err),
      () => {
        console.log('done loading firstdowns');
      }
    );
  }
}
