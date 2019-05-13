import {Injectable} from '@angular/core';
import {Team} from '../interfaces/team';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private teamsUrl = environment.api_URI + 'teams';

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
        const url = environment.api_URI + `oneteam/${season}/${ab}`;
        return this.http.get<Team>(url);
    }
}
