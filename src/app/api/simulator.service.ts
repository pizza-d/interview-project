import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class SimulatorService implements HttpInterceptor {

  constructor(private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!environment.ONLINE) {
      console.log(req.url)
      return this.http.get<any>(`/assets/simulate/${req.url}.json`).pipe(
        map(response => {
          return new HttpResponse({
            status: 200,
            body: response
          });
        })
      );
    }

    return next.handle(req);
  }
}
