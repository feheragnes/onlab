import { Component, OnInit } from "@angular/core";
import { GamesService } from "../../services/games.service";
import { Season } from 'src/app/interfaces/season';

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.scss"]
})
export class GamesComponent implements OnInit {
  public games;

  seasons = [];

  selectedSeason : number =  2018;

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.getSeasons();
    this.getGames();
  }

  onSeasonChanged(season: Season): void {
    this.selectedSeason = season.season;
    this.getGames();
  }

  getGames(): void {
    this.gamesService.getGamesBySeason(this.selectedSeason).subscribe(
      data => {
        this.games = data;
      },
      err => console.error(err),
      () => console.log("done loading games")
    );
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

  getHead2Head(): void {
    this.gamesService.getGames().subscribe(
      data => {
        this.games = data;
      },
      err => console.error(err),
      () => console.log("done loading head2head")
    );
  }
}
