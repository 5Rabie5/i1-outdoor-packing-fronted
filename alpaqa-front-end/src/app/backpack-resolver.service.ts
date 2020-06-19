import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { APIService } from './api.service';




@Injectable()
export class APIResolver implements Resolve<any> {
  constructor(private apiService: APIService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getItems(route.params.date);
  }
}
