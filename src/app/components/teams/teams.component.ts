import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public nfcWestTeams;
  public nfcEastTeams;
  public nfcNorthTeams;
  public nfcSouthTeams;
  public afcWestTeams;
  public afcEastTeams;
  public afcNorthTeams;
  public afcSouthTeams;
  public teams;
  public selectedSeason = 2018;
  loading = true;
  seasons = [];

  constructor(
    private teamService: TeamService,
    private gamesService: GamesService
  ) {}

  ngOnInit() {
    this.getSeasons();
    this.getTeams();
  }

  getSeasons(): void {
    this.gamesService.getSeasons().subscribe(
      data => {
        this.seasons = data;
      },
      err => console.error(err),
      () => console.log('done loading seasons')
    );
  }

  onSeasonChanged(season: number): void {
    this.selectedSeason = season;
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams(this.selectedSeason).subscribe(
      data => {
        this.nfcWestTeams = data.filter(x => x.division == 'NFC West');
        this.nfcEastTeams = data.filter(x => x.division == 'NFC East');
        this.nfcNorthTeams = data.filter(x => x.division == 'NFC North');
        this.nfcSouthTeams = data.filter(x => x.division == 'NFC South');
        this.afcWestTeams = data.filter(x => x.division == 'AFC West');
        this.afcEastTeams = data.filter(x => x.division == 'AFC East');
        this.afcNorthTeams = data.filter(x => x.division == 'AFC North');
        this.afcSouthTeams = data.filter(x => x.division == 'AFC South');
        this.teams = data;
        this.loading = false;
      },
      err => console.error(err),
      () => console.log('done loading teams')
    );
  }
}
