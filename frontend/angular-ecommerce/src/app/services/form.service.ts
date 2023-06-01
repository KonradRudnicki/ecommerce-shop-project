import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Country} from "../common/country";
import {map} from "rxjs/operators";
import {State} from "../common/state";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(
        response => response._embedded.states)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = []

    for (let curMonth = startMonth; curMonth <= 12; curMonth++) {
      data.push(curMonth)
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = []

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let curYear = startYear; curYear <= endYear; curYear++) {
      data.push(curYear)
    }

    return of(data);
  }
}

interface GetResponseCountries {

  _embedded: {
    countries: Country[]
  }
}

interface GetResponseStates {

  _embedded: {
    states: State[]
  }
}
