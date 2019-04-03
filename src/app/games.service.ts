import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from './game';
import { HttpClient } from '@angular/common/http/';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private gamesURL = 'https://localhost:44360/games';

  constructor(private http: HttpClient) { }


  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesURL)
  }

  getGame(id: number): Observable<Game> {
      const url = `${this.gamesURL}/${id}`;
      return this.http.get<Game>(url)
  }
}
