import { Routes } from '@angular/router';
import { PicslistComponent } from './pics/picslist/picslist.component';
import { PicdetailsComponent } from './pics/picdetails/picdetails.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: PicslistComponent,
  },
  {
    path: 'pics/:id',
    component: PicdetailsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
