import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';

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

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams().subscribe(
      data => {
        this.nfcWestTeams = data.filter(x => x.division == 'NFC West');
        this.nfcEastTeams = data.filter(x => x.division == 'NFC East');
        this.nfcNorthTeams = data.filter(x => x.division == 'NFC North');
        this.nfcSouthTeams = data.filter(x => x.division == 'NFC South');
        this.afcWestTeams = data.filter(x => x.division == 'AFC West');
        this.afcEastTeams = data.filter(x => x.division == 'AFC East');
        this.afcNorthTeams = data.filter(x => x.division == 'AFC North');
        this.afcSouthTeams = data.filter(x => x.division == 'AFC South');
      },
      err => console.error(err),
      () => console.log('done loading teams')
    );
  }
}
