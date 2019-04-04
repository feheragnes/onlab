import { Component, OnInit } from "@angular/core";
import { PlayerService } from "../../services/player.service";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent implements OnInit {
  public players;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers().subscribe(
      data => {
        this.players = data;
      },
      err => console.error(err),
      () => console.log("done loading players")
    );
  }
}
