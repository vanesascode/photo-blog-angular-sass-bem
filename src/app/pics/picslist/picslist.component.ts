import { Component, OnInit } from '@angular/core';
import { Pic } from '../pic.model';
import { PicsService } from '../pics.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-picslist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './picslist.component.html',
  styleUrl: './picslist.component.scss',
})
export class PicslistComponent implements OnInit {
  pics: Pic[] = [];
  constructor(private picsService: PicsService) {}

  ngOnInit(): void {
    this.picsService.getAllPics().subscribe((data: Pic[]) => {
      this.pics = data;
    });
  }
}
