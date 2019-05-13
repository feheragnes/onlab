import {Injectable} from '@angular/core';
import {Player} from '../interfaces/player';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private playersURL = environment.api_URI + 'players';
    private playersTeamSeasonURL = environment.api_URI + 'players/by-team-and-season';

    constructor(private http: HttpClient) {
    }

    getPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>(this.playersURL);
    }

    getPlayer(id: string): Observable<Player> {
        const url = `${this.playersURL}/${id}`;
        return this.http.get<Player>(url);
    }

    getPlayersByTeamSeason(ab: string, season: number) {
        const url = `${this.playersTeamSeasonURL}/${ab}/${season}`;
        return this.http.get<Player>(url);
    }
}
