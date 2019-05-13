import {Injectable} from '@angular/core';
import {Player} from '../interfaces/player';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    private playersURL = 'https://apiv2dev.nkelemen.hu/players';
    private playersTeamSeasonURL =
        'https://apiv2dev.nkelemen.hu/players/by-team-and-season';

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
