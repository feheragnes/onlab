import { Injectable } from '@angular/core';
import { GAMES } from './mock-games';
import { Observable, of } from 'rxjs';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() { }

  
  getGames(): Observable<Game[]> {
    return of(GAMES);
  }

  getGame(id: number): Observable<Game> {
    return of(GAMES.find(game => game.gameId === id));
  }
}
