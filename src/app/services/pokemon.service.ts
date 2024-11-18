import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getPokemonById(pokemon: number | string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/pokemon/${pokemon}`)
  }

  getSomePokemons(limit: number, offset: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`)
  }
}
