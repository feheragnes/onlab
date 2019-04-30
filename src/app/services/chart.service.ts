import { Injectable } from '@angular/core';
import { ThirdDown } from '../interfaces/thirddown';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Dline } from '../interfaces/dline';
import { Secondary } from '../interfaces/secondary';
import { FirstDown } from '../interfaces/firstdown';
import { TdYpg } from '../interfaces/tdypg';
import { Tackle, Sack, Interception } from '../interfaces/defense';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private thirddownUrl = 'https://apiv2dev.nkelemen.hu/league/thirddowns';
  private firstdownUrl = 'https://apiv2dev.nkelemen.hu/league/firstdowns';
  private dlineUrl = 'https://apiv2dev.nkelemen.hu/league/dlines';
  private secondaryUrl = 'https://apiv2dev.nkelemen.hu/league/secondaries';
  private tdypgUrl = 'https://apiv2dev.nkelemen.hu/league/tdypg';

  constructor(private http: HttpClient) {}

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
    return this.http.get<Sack[]>(
      `https://apiv2dev.nkelemen.hu/sacks/${season}`
    );
  }

  getTackles(season: number): Observable<Tackle[]> {
    return this.http.get<Tackle[]>(
      `https://apiv2dev.nkelemen.hu/tackles/${season}`
    );
  }

  getInterceptions(season: number): Observable<Interception[]> {
    return this.http.get<Interception[]>(
      `https://apiv2dev.nkelemen.hu/interceptions/${season}`
    );
  }

  getRb(season: number): Observable<[]> {
    return this.http.get<[]>(`https://apiv2dev.nkelemen.hu/rb/${season}`);
  }

  getQb(season: number): Observable<[]> {
    return this.http.get<[]>(`https://apiv2dev.nkelemen.hu/qb/${season}`);
  }
}
