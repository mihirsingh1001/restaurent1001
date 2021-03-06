import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { from, Observable,  of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/basedurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpMsgService } from './process-http-msg.service';
 

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http : HttpClient,
              private ProcessHttpMsgService : ProcessHttpMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.ProcessHttpMsgService.handleError));
  
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.ProcessHttpMsgService.handleError));

  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
    .pipe(map(dishes=>dishes[0]))
    .pipe(catchError(this.ProcessHttpMsgService.handleError));

  }
  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));

  }
   

}
