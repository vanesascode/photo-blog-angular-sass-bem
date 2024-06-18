import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Pic } from '../pic.model';
import { PicsService } from '../pics.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-picslist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './picslist.component.html',
  styleUrl: './picslist.component.scss',
})
export class PicslistComponent implements OnInit {
  constructor(
    private picsService: PicsService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  isBrowser!: boolean;
  pics: Pic[] = [];
  page: number = 1;
  picsPerPage: number = 8;
  totalPages!: number;

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

  ngOnInit(): void {
    this.setPicsPerPageBasedOnWindowWidth();

    this.picsService.getAllPics().subscribe((totalPics: Pic[]) => {
      this.totalPages = Math.ceil(totalPics.length / this.picsPerPage);
    });

    this.picsService
      .getPicsWithPagination(this.page, this.picsPerPage)
      .subscribe((data: Pic[]) => {
        this.pics = data;
      });
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.picsService
        .getPicsWithPagination(this.page + 1, this.picsPerPage)
        .subscribe((data: Pic[]) => {
          this.pics = data;
          this.page += 1;
        });
    }
    this.scrollToTop();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.picsService
        .getPicsWithPagination(this.page - 1, this.picsPerPage)
        .subscribe((data: Pic[]) => {
          this.pics = data;
          this.page -= 1;
        });
    }
    this.scrollToTop();
  }
}
