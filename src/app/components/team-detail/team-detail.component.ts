import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Team } from "../../interfaces/team";
import { TeamService } from "../../services/team.service";
import { Location } from "@angular/common";
import { Season } from 'src/app/interfaces/season';
import { PlayerService } from 'src/app/services/player.service';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: "app-team-detail",
  templateUrl: "./team-detail.component.html",
  styleUrls: ["./team-detail.component.scss"]
})
export class TeamDetailComponent implements OnInit {
  @Input() team: Team;

  public players;

  seasons = [];

  selectedSeason : number =  2018;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private playerService: PlayerService,
    private gamesService: GamesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSeasons();
    this.getTeam();
    this.getPlayers();
  }

  onSeasonChanged(season: Season): void {
    this.selectedSeason = season.season;
    this.getPlayers();
  }

  getTeam(): void {
    const ab = this.route.snapshot.paramMap.get("ab");
    console.log(ab);
    this.teamService.getTeam(ab).subscribe(team => (this.team = team));
  }

  getPlayers(): void {
    const ab = this.route.snapshot.paramMap.get("ab");
    console.log(ab);
    this.playerService.getPlayersByTeamSeason(ab, this.selectedSeason).subscribe(players => (this.players = players));
  }

  getSeasons(): void {
    this.gamesService.getSeasons().subscribe(
      data => {
        this.seasons = data;
      },
      err => console.error(err),
      () => console.log("done loading seasons")
    );
  }
}
