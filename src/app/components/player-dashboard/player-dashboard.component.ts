import { Component, OnInit } from "@angular/core";
import { Player } from "../../interfaces/player";
import { PlayerService } from "../../services/player.service";

@Component({
  selector: "app-player-dashboard",
  templateUrl: "./player-dashboard.component.html",
  styleUrls: ["./player-dashboard.component.scss"]
})
export class PlayerDashboardComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService
      .getPlayers()
      .subscribe(players => (this.players = players.slice(1, 5)));
  }
}
