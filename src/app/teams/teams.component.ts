import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  public teams;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.getTeams();
  }

getTeams() :void {
  this.teamService.getTeams().subscribe(
    data => { this.teams = data},
    err => console.error(err),
    () => console.log('done loading teams')
   );
 }
}
