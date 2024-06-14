import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicslistComponent } from './picslist.component';

describe('PicslistComponent', () => {
  let component: PicslistComponent;
  let fixture: ComponentFixture<PicslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PicslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
