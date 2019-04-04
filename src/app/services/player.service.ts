import { Injectable } from "@angular/core";
import { Player } from "../interfaces/player";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  private playersURL = "https://localhost:44360/players";

  constructor(private http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersURL);
  }

  getPlayer(id: string): Observable<Player> {
    const url = `${this.playersURL}/${id}`;
    return this.http.get<Player>(url);
  }
}
