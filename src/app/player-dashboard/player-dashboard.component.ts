import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';
 
@Component({
  selector: 'app-player-dashboard',
  templateUrl: './player-dashboard.component.html',
  styleUrls: [ './player-dashboard.component.css' ]
})
export class PlayerDashboardComponent implements OnInit {
  players: Player[] = [];
 
  constructor(private playerService: PlayerService) { }
 
  ngOnInit() {
    this.getPlayers();
  }
 
  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(players => this.players = players.slice(1, 5));
  }
}