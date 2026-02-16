import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchBYcapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http
      .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountry(resp)),
        catchError((error) => {
          console.error('Error en la petición HTTP', error);
          return throwError(() => new Error(`No se pudo buscar el país con ese query:  ${query}`));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();


    return this.http
      .get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountry(resp)),
        delay(3000),
        catchError((error) => {
          console.error('Error en la petición HTTP', error);
          return throwError(() => new Error(`No se pudo buscar el país con ese query:  ${query}`));
        })
      );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http
      .get<RESTCountry[]>(url)
      .pipe(
        map((resp) => CountryMapper.mapRestCountryArrayToCountry(resp)),
        map((countries) => countries.at(0)), // Asegura que siempre se devuelva un array
        catchError((error) => {
          console.error('Error en la petición HTTP', error);
          return throwError(() => new Error(`No se pudo buscar el país con ese código:  ${code}`));
        })
      );
  }
}
