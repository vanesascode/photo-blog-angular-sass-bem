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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id) {
        this.picsService.getPic(parseInt(id, 10)).subscribe((data: any) => {
          this.pic = data;
        });
      }
    });

    this.picsService.getAllPics();
    this.totalPics = this.picsService.totalPics;
  }

  goBack(): void {
    if (this.pic.id > 1) {
      this.router.navigateByUrl(`/pics/${this.pic.id - 1}`);
    }
  }

  goNext(): void {
    if (this.pic.id < this.picsService.totalPics) {
      this.router.navigateByUrl(`/pics/${this.pic.id + 1}`);
    }
  }
}
