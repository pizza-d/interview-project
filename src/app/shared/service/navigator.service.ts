import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(
    private router: Router
  ) { }

  push(path: string, params?: any): void {
    this.router.navigate([path], params);
  }
}
