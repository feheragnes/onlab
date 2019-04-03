import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  public games;

  private isOpen = {}
  
  constructor(private gamesService: GamesService) { }

    ngOnInit() {
      this.getGames();
    }

  getGames() :void {
    this.gamesService.getGames().subscribe(
      data => { this.games = data},
      err => console.error(err),
      () => console.log('done loading games')
     );
   }

}
