import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from '../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Drink } from './model/drink';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getDrinksByName(name: string): Observable<Array<Drink>> {
    return this.http.get(this.apiUrl+'/search.php?s=' + name)
    .pipe(
      map( (r) => {
        return r['drinks'] as Array<Drink>;
      })
    )
  }
}
