import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PicsService } from '../pics.service';
import { Pic } from '../pic.model';

@Component({
  selector: 'app-picdetails',
  standalone: true,
  imports: [],
  templateUrl: './picdetails.component.html',
  styleUrl: './picdetails.component.scss',
})
export class PicdetailsComponent implements OnInit {
  constructor(
    private picsService: PicsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  pic!: Pic;
  totalPics!: number;
  disablePreviousButton!: boolean;
  disableNextButton!: boolean;

  ngOnInit(): void {
    this.picsService.getAllPics();
    this.totalPics = this.picsService.totalPics;

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id) {
        this.picsService.getPic(parseInt(id, 10)).subscribe((data: any) => {
          this.pic = data;
        });
        this.disableNextButtonFunction(+id as any as number);
        this.disablePreviousButtonFunction(+id as any as number);
      }
    });
  }

  disablePreviousButtonFunction(id: number): void {
    id = id ?? this.pic.id;
    if (id === 1) {
      this.disablePreviousButton = true;
    } else {
      this.disablePreviousButton = false;
    }
  }

  disableNextButtonFunction(id: number): void {
    id = id ?? this.pic.id;
    if (id === this.totalPics) {
      this.disableNextButton = true;
    } else {
      this.disableNextButton = false;
    }
  }

  goBack(): void {
    if (this.pic.id > 1) {
      const id = this.pic.id - 1;
      this.router.navigateByUrl(`/pics/${id}`);
      this.disableNextButtonFunction(id);
      this.disablePreviousButtonFunction(id);
    }
  }

  goNext(): void {
    if (this.pic.id < this.picsService.totalPics) {
      const id = this.pic.id + 1;
      this.router.navigateByUrl(`/pics/${id}`);
      this.disableNextButtonFunction(id);
      this.disablePreviousButtonFunction(id);
    }
  }
}
