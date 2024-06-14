import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Pic } from './pic.model';
import { picsData } from './pics.data';

@Injectable({
  providedIn: 'root',
})
export class PicsService {
  private data: Pic[] = picsData;

  constructor() {}

  getAllPics() {
    return of(this.data); //of() - observable that emits a single value and then completes.
  }

  getPic(id: number) {
    return of(this.data.find((pic) => pic.id === id));
  }
}
