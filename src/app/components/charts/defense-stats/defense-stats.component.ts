import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ChartService } from 'src/app/services/chart.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-defense-stats',
  templateUrl: './defense-stats.component.html',
  styleUrls: ['./defense-stats.component.css']
})
export class DefenseStatsComponent implements OnInit {
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
  public sacksChartLabels: Label[] = [];
  public tacklesChartLabels: Label[] = [];
  public interceptionsChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public sacksChartData: ChartDataSets[] = [{ data: [], label: 'Sacks' }];
  public tacklesChartData: ChartDataSets[] = [{ data: [], label: 'Tackles' }];
  public interceptionsChartData: ChartDataSets[] = [
    { data: [], label: 'Interceptions' }
  ];

  public barChartColors = [
    {
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
        this.getDefenseStats();
      },
      err => console.error(err),
      () => console.log('done loading seasons')
    );
  }

  onSeasonChanged(season: number): void {
    this.selectedSeason = season;
    this.getDefenseStats();
  }

  getDefenseStats(): void {
    this.chartService.getSacks(this.selectedSeason).subscribe(
      data => {
        this.sacksChartLabels = data.map(x => x.name + ', ' + x.team);
        this.sacksChartData[0].data = data.map(x => x.sacksNumber);
      },
      err => console.error(err),
      () => console.log('done loading sacks')
    );
    this.chartService.getTackles(this.selectedSeason).subscribe(
      data => {
        this.tacklesChartLabels = data.map(x => x.name + ', ' + x.team);
        this.tacklesChartData[0].data = data.map(x => x.tacklesNumber);
      },
      err => console.error(err),
      () => console.log('done loading tackles')
    );
    this.chartService.getInterceptions(this.selectedSeason).subscribe(
      data => {
        this.interceptionsChartLabels = data.map(x => x.name + ', ' + x.team);
        this.interceptionsChartData[0].data = data.map(
          x => x.interceptionsNumber
        );
      },
      err => console.error(err),
      () => console.log('done loading interceptions')
    );
  }
}
