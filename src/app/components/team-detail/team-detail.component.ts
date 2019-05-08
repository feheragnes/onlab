import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../interfaces/team';
import { TeamService } from '../../services/team.service';
import { Location } from '@angular/common';
import { PlayerService } from 'src/app/services/player.service';
import { GamesService } from 'src/app/services/games.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  public lineChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          return label + ': ' + tooltipItem.yLabel;
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';

  public lineChartLabels: Label[] = [];
  public lineChartLegend = true;

  allowedAllTdsByMatch: number[] = [];
  scoredAllTdsByMatch: number[] = [];
  allowedRushingTdsByMatch: number[] = [];
  scoredRushingTdsByMatch: number[] = [];
  allowedReceivingTdsByMatch: number[] = [];
  scoredReceivingTdsByMatch: number[] = [];
  allowedAllYardsByMatch: number[] = [];
  scoredAllYardsByMatch: number[] = [];
  allowedRushingYardsByMatch: number[] = [];
  scoredRushingYardsByMatch: number[] = [];
  allowedReceivingYardsByMatch: number[] = [];
  scoredReceivingYardsByMatch: number[] = [];

  public lineChartDataTd = [{ data: [], label: 'Td' }];
  public lineChartDataYard = [{ data: [], label: 'Yards' }];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = ['Win', 'Lose', 'Draw'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartColors = [
    {
      backgroundColor: ['#006600', '#d32f2f', '#1a237e']
    }
  ];

  public barChartData: ChartDataSets[] = [{ data: [] }];

  selectedAllowedScored = 'allowed';
  selectedType = 'all';

  @Input() team: Team;

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getTeam();
  }

  getTeam(): void {
    const ab = this.route.snapshot.paramMap.get('ab');
    console.log(ab);
    this.teamService.getOneTeam(ab).subscribe(team => {
      this.team = team;
      this.loading = false;
      this.lineChartDataTd[0].data = [];
      this.lineChartDataYard[0].data = [];
      this.lineChartLabels = team.opponents;
      this.allowedAllTdsByMatch = team.allowedAllTdsByMatch;
      this.scoredAllTdsByMatch = team.scoredAllTdsByMatch;
      this.allowedRushingTdsByMatch = team.allowedRushingTdsByMatch;
      this.scoredRushingTdsByMatch = team.scoredRushingTdsByMatch;
      this.allowedReceivingTdsByMatch = team.allowedReceivingTdsByMatch;
      this.scoredReceivingTdsByMatch = team.scoredReceivingTdsByMatch;
      this.allowedAllYardsByMatch = team.allowedAllYardsByMatch;
      this.scoredAllYardsByMatch = team.scoredAllYardsByMatch;
      this.allowedRushingYardsByMatch = team.allowedRushingYardsByMatch;
      this.scoredRushingYardsByMatch = team.scoredRushingYardsByMatch;
      this.allowedReceivingYardsByMatch = team.allowedReceivingYardsByMatch;
      this.scoredReceivingYardsByMatch = team.scoredReceivingYardsByMatch;
      this.lineChartDataTd[0].data = this.allowedAllTdsByMatch;
      this.lineChartDataYard[0].data = this.allowedAllYardsByMatch;
      this.barChartData[0].data = [team.win, team.lose, team.draw];
    });
  }

  onAllowedScoredChanged(value: string): void {
    this.selectedAllowedScored = value;
    if (this.selectedAllowedScored == 'allowed' && this.selectedType == 'all') {
      this.lineChartDataTd[0].data = this.allowedAllTdsByMatch;
      this.lineChartDataYard[0].data = this.allowedAllYardsByMatch;
    } else if (
      this.selectedAllowedScored == 'scored' &&
      this.selectedType == 'all'
    ) {
      this.lineChartDataTd[0].data = this.scoredAllTdsByMatch;
      this.lineChartDataYard[0].data = this.scoredAllYardsByMatch;
    } else if (
      this.selectedAllowedScored == 'allowed' &&
      this.selectedType == 'rushing'
    ) {
      this.lineChartDataTd[0].data = this.allowedRushingTdsByMatch;
      this.lineChartDataYard[0].data = this.allowedRushingYardsByMatch;
    } else if (
      this.selectedAllowedScored == 'scored' &&
      this.selectedType == 'rushing'
    ) {
      this.lineChartDataTd[0].data = this.scoredRushingTdsByMatch;
      this.lineChartDataYard[0].data = this.scoredRushingYardsByMatch;
    } else if (
      this.selectedAllowedScored == 'allowed' &&
      this.selectedType == 'receiving'
    ) {
      this.lineChartDataTd[0].data = this.allowedReceivingTdsByMatch;
      this.lineChartDataYard[0].data = this.allowedReceivingYardsByMatch;
    } else if (
      this.selectedAllowedScored == 'scored' &&
      this.selectedType == 'receiving'
    ) {
      this.lineChartDataTd[0].data = this.scoredReceivingTdsByMatch;
      this.lineChartDataYard[0].data = this.scoredReceivingYardsByMatch;
    }
  }

  onTypeChanged(value: string): void {
    this.selectedType = value;
    if (this.selectedAllowedScored == 'allowed' && this.selectedType == 'all') {
      this.lineChartDataTd[0].data = this.allowedAllTdsByMatch;
      this.lineChartDataYard[0].data = this.allowedAllYardsByMatch;
    } else if (
      this.selectedAllowedScored == 'scored' &&
      this.selectedType == 'all'
    ) {
      this.lineChartDataTd[0].data = this.scoredAllTdsByMatch;
      this.lineChartDataYard[0].data = this.scoredAllYardsByMatch;
    } else if (
      this.selectedAllowedScored == 'allowed' &&
      this.selectedType == 'rushing'
    ) {
      this.lineChartDataTd[0].data = this.allowedRushingTdsByMatch;
      this.lineChartDataYard[0].data = this.allowedRushingYardsByMatch;
    } else if (
      this.selectedAllowedScored == 'scored' &&
      this.selectedType == 'rushing'
    ) {
      this.lineChartDataTd[0].data = this.scoredRushingTdsByMatch;
      this.lineChartDataYard[0].data = this.scoredRushingYardsByMatch;
    } else if (
      this.selectedAllowedScored == 'allowed' &&
      this.selectedType == 'receiving'
    ) {
      this.lineChartDataTd[0].data = this.allowedReceivingTdsByMatch;
      this.lineChartDataYard[0].data = this.allowedReceivingYardsByMatch;
    } else if (
      this.selectedAllowedScored == 'scored' &&
      this.selectedType == 'receiving'
    ) {
      this.lineChartDataTd[0].data = this.scoredReceivingTdsByMatch;
      this.lineChartDataYard[0].data = this.scoredReceivingYardsByMatch;
    }
  }
}
