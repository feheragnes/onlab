import {Injectable} from '@angular/core';
import {ThirdDown} from '../interfaces/thirddown';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Dline} from '../interfaces/dline';
import {Secondary} from '../interfaces/secondary';
import {FirstDown} from '../interfaces/firstdown';
import {TdYpg} from '../interfaces/tdypg';
import {Interception, Sack, Tackle} from '../interfaces/defense';
import {Rb} from '../interfaces/rb';
import {Qb} from '../interfaces/qb';
import {Wr} from '../interfaces/wr';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChartService {
    private thirddownUrl = environment.api_URI + 'league/thirddowns';
    private firstdownUrl = environment.api_URI + 'league/firstdowns';
    private dlineUrl = environment.api_URI + 'league/dlines';
    private secondaryUrl = environment.api_URI + 'league/secondaries';
    private tdypgUrl = environment.api_URI + 'league/tdypg';

    constructor(private http: HttpClient) {
    }

    getThirdDowns(season: number): Observable<ThirdDown[]> {
        return this.http.get<ThirdDown[]>(`${this.thirddownUrl}/${season}`);
    }

    getFirstDowns(season: number): Observable<FirstDown[]> {
        return this.http.get<FirstDown[]>(`${this.firstdownUrl}/${season}`);
    }

    getDlines(season: number): Observable<Dline[]> {
        return this.http.get<Dline[]>(`${this.dlineUrl}/${season}`);
    }

    getSecondaries(season: number): Observable<Secondary[]> {
        return this.http.get<Secondary[]>(`${this.secondaryUrl}/${season}`);
    }

    getTdYpg(season: number): Observable<TdYpg[]> {
        return this.http.get<TdYpg[]>(`${this.tdypgUrl}/${season}`);
    }

    getSacks(season: number): Observable<Sack[]> {
        return this.http.get<Sack[]>(environment.api_URI + `sacks/${season}`);
    }

    getTackles(season: number): Observable<Tackle[]> {
        return this.http.get<Tackle[]>(environment.api_URI + `tackles/${season}`);
    }

    getInterceptions(season: number): Observable<Interception[]> {
        return this.http.get<Interception[]>(environment.api_URI + `interceptions/${season}`);
    }

    getRbs(season: number): Observable<Rb[]> {
        return this.http.get<Rb[]>(environment.api_URI + `rb/${season}`);
    }

    getQb(season: number): Observable<Qb[]> {
        return this.http.get<Qb[]>(environment.api_URI + `qb/${season}`);
    }

    getWrs(season: number): Observable<Wr[]> {
        return this.http.get<Wr[]>(environment.api_URI + `wr/${season}`);
    }
}
