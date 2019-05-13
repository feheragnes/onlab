import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../interfaces/game';
import {HttpClient} from '@angular/common/http/';
import {Head2Head} from '../interfaces/head2head';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    private gamesURL = environment.api_URI + 'games';
    private gamesSeasonURL = environment.api_URI + '/games/season';
    private head2headUrl = environment.api_URI + 'head2head';

    constructor(private http: HttpClient) {
    }

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
        const url = environment.api_URI + 'seasons/years';
        return this.http.get<number[]>(url);
    }
}
