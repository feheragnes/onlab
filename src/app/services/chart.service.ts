import { Injectable } from '@angular/core';
import { ThirdDown } from '../interfaces/thirddown';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Dline } from '../interfaces/dline';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private thirddownUrl = 'https://apiv2dev.nkelemen.hu/league/thirddowns';
  private dlineUrl = 'https://apiv2dev.nkelemen.hu/league/dlines';

  constructor(private http: HttpClient) {}

  getThirdDown(season: number): Observable<ThirdDown[]> {
    return this.http.get<ThirdDown[]>(`${this.thirddownUrl}/${season}`);
  }
  getDlines(season: number): Observable<Dline[]> {
    return this.http.get<Dline[]>(`${this.dlineUrl}/${season}`);
  }
}
