import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicdetailsComponent } from './picdetails.component';

describe('PicdetailsComponent', () => {
  let component: PicdetailsComponent;
  let fixture: ComponentFixture<PicdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PicdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
