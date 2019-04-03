import { Injectable } from '@angular/core';
import { Team } from './team';
import { Observable, of } from 'rxjs';
import { TEAMS } from './mock-teams';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsUrl = 'https://localhost:44360/teams'

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
  }

  getTeam(ab: string): Observable<Team> {
    return of(TEAMS.find(team => team.abbrevation === ab));
  }
}
