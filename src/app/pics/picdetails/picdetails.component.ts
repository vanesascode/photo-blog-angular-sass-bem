import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
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
    private location: Location
  ) {}
  pic!: Pic;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      //paramMap is an observable
      let id = params.get('id');

      if (id) {
        this.picsService.getPic(parseInt(id, 10)).subscribe((data: any) => {
          this.pic = data;
        });
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
