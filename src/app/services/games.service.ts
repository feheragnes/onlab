import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../interfaces/game';
import { HttpClient } from '@angular/common/http/';
import { Head2Head } from '../interfaces/head2head';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private gamesURL = 'https://apiv2dev.nkelemen.hu/games';
  private gamesSeasonURL = 'https://apiv2dev.nkelemen.hu/games/season';
  private head2headUrl = 'https://apiv2dev.nkelemen.hu/head2head';

  constructor(private http: HttpClient) {}

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesURL);
  }

  getGamesBySeason(season: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.gamesSeasonURL}/${season}`);
  }

  getGame(id: number): Observable<Game> {
    const url = `${this.gamesURL}/${id}`;
    return this.http.get<Game>(url);
  }
  getHead2Head(id: number): Observable<Head2Head> {
    const url = `${this.head2headUrl}/${id}`;
    return this.http.get<Head2Head>(url);
  }

  getSeasons(): Observable<number[]> {
    const url = 'https://apiv2dev.nkelemen.hu/seasons/years';
    return this.http.get<number[]>(url);
  }
}
