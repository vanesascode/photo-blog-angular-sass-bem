import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pic } from './pic.model';
import { picsData } from './pics.data';

@Injectable({
  providedIn: 'root',
})
export class PicsService {
  private data: Pic[] = picsData;

  constructor() {}

  getAllPics() {
    return of(this.data);
  }

  getPicsWithPagination(
    page: number,
    pageSize: number = 12
  ): Observable<Pic[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return of(this.data.slice(startIndex, endIndex));
  }

  getPic(id: number) {
    return of(this.data.find((pic) => pic.id === id));
  }
}
