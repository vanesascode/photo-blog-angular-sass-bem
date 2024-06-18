import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Pic } from './pic.model';
import { picsData } from './pics.data';

@Injectable({
  providedIn: 'root',
})
export class PicsService {
  private data: Pic[] = picsData;
  isBrowser!: boolean;
  totalPics!: number;
  totalPages!: number;
  picsPerPage: number = 12;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setPicsPerPageBasedOnWindowWidth(): void {
    if (this.isBrowser) {
      const windowWidth = window.innerWidth;
      if (windowWidth < 480) {
        this.picsPerPage = 6;
      } else if (windowWidth <= 1440) {
        this.picsPerPage = 12;
      } else {
        this.picsPerPage = 15;
      }
    }
  }

  getAllPics() {
    this.setPicsPerPageBasedOnWindowWidth();
    this.totalPics = picsData.length;
    this.totalPages = Math.ceil(picsData.length / this.picsPerPage);
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
