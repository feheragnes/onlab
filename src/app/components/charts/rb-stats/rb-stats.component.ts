import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Rb } from 'src/app/interfaces/rb';
import { ChartService } from 'src/app/services/chart.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-rb-stats',
  templateUrl: './rb-stats.component.html',
  styleUrls: ['./rb-stats.component.css']
})
export class RbStatsComponent implements OnInit {
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

  public barChartData: ChartDataSets[] = [{ data: [], label: 'Yards/Carrys' }];
  public barChartData2: ChartDataSets[] = [{ data: [], label: 'Yards/Games' }];

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
  public scatterChartLegend = false;

  public touchdowns: number[] = [];
  public yards: number[] = [];
  public rushAttempts: number[] = [];
  public games: number[] = [];
  maxRa: number;
  minRa: number;
  maxGames: number;
  minGames: number;
  selectedRushAttempts = 0;
  selectedGames = 0;
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
  teams = [];
  selectedSeason = 2018;
  selectedTeam = 'All';

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

  onTeamChanged(team: string): void {
    this.selectedTeam = team;
    this.filterData(
      this.selectedGames,
      this.selectedRushAttempts,
      this.selectedTeam
    );
  }

  onRaSliderChanged(event: any): void {
    this.selectedRushAttempts = event.value;
    console.log(this.selectedRushAttempts);
    this.filterData(
      this.selectedGames,
      this.selectedRushAttempts,
      this.selectedTeam
    );
  }

  onGamesSliderChanged(event: any): void {
    this.selectedGames = event.value;
    console.log(this.selectedGames);
    this.filterData(
      this.selectedGames,
      this.selectedRushAttempts,
      this.selectedTeam
    );
  }

  getRbs(): void {
    this.chartService.getRbs(this.selectedSeason).subscribe(
      data => {
        this.rbs = data;
        this.teams = Array.from(new Set(data.map((item: any) => item.team)));
        this.teams.push('All');
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
        this.barChartData2[0].data = data.map(x => x.yardsPerGames);
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

  filterData(g: number, ra: number, t: string) {
    this.filteredRbs = this.rbs.filter(
      x => x.games >= g && x.rushAttempts >= ra && (x.team == t || t == 'All')
    );
    this.barChartLabels = this.filteredRbs.map(
      x => x.name + ' (' + x.team + ')'
    );
    this.barChartData[0].data = this.filteredRbs.map(x => x.yardsPerCarrys);
    this.barChartData2[0].data = this.filteredRbs.map(x => x.yardsPerGames);
    this.scatterChartLabels = this.filteredRbs.map(
      x => x.name + ' (' + x.team + ')'
    );
    this.scatterChartData[0].data = [];
    this.touchdowns = this.filteredRbs.map(x => x.touchdowns);
    this.yards = this.filteredRbs.map(x => x.yards);
    this.scatterChartData[0].data = this.getScatter(
      this.yards,
      this.touchdowns,
      this.scatterChartData[0].data
    );
  }
}
