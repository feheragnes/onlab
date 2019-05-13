import {Injectable} from '@angular/core';
import {Team} from '../interfaces/team';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private teamsUrl = 'https://apiv2dev.nkelemen.hu/teams';

    constructor(private http: HttpClient) {
    }

    getTeams(season: number): Observable<Team[]> {
        const url = `${this.teamsUrl}/${season}`;
        return this.http.get<Team[]>(url);
    }

    getTeam(ab: string, season: number): Observable<Team> {
        const url = `${this.teamsUrl}/${season}/${ab}`;
        return this.http.get<Team>(url);
    }

    getOneTeam(ab: string, season: number): Observable<Team> {
        const url = `https://apiv2dev.nkelemen.hu/oneteam/${season}/${ab}`;
        return this.http.get<Team>(url);
    }
}
