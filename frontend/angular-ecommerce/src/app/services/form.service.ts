import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = []

    for (let curMonth = startMonth; curMonth <= 12; curMonth++) {
      data.push(curMonth)
    }

    return of(data);
  }

  getCreditCardYears(startMonth: number): Observable<number[]> {

    let data: number[] = []

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let curYear = startYear; curYear <= endYear; curYear++) {
      data.push(curYear)
    }

    return of(data);
  }
}
