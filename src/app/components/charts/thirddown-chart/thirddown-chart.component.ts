import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { GamesService } from 'src/app/services/games.service';
import { ThirdDown } from 'src/app/interfaces/thirddown';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-thirddown-chart',
  templateUrl: './thirddown-chart.component.html',
  styleUrls: ['./thirddown-chart.component.css']
})
export class ThirddownChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Thirddowns' }];

  public barChartColors = [
    {
      backgroundColor: '#7986cb'
    }
  ];

  thirddowns: ThirdDown[] = [];
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
        this.getThirdDowns();
      },
      err => console.error(err),
      () => console.log('done loading seasons')
    );
  }

  onSeasonChanged(season: number): void {
    this.selectedSeason = season;
    this.getThirdDowns();
  }

  getThirdDowns(): void {
    this.chartService.getThirdDowns(this.selectedSeason).subscribe(
      data => {
        this.barChartLabels = data.map(x => x.team);
        this.barChartData = [
          {
            data: data.map(x => x.thirdDown),
            label: 'Thirddowns'
          }
        ];
      },
      err => console.error(err),
      () => console.log('done loading thirddown')
    );
  }
}
