import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(private gamesService: GamesService) {}

  public game;
  public seasons;
  public maxseason;
  public week;

  ngOnInit() {
    this.getSeasons();
  }

  getGame(): void {
    this.gamesService.getGamesBySeason(this.maxseason).subscribe(
      data => {
        this.game = data.pop();
        this.week = this.game.week;
      },
      err => console.error(err),
      () => console.log('done loading game')
    );
  }

  getSeasons(): void {
    this.gamesService.getSeasons().subscribe(
      data => {
        this.seasons = data;
      },
      err => console.error(err),
      () => {
        this.maxseason = Math.max.apply(null, this.seasons);
        this.getGame();
      }
    );
  }
}
