import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerCropHistoryComponent } from './farmer-crop-history.component';

describe('FarmerCropHistoryComponent', () => {
  let component: FarmerCropHistoryComponent;
  let fixture: ComponentFixture<FarmerCropHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerCropHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerCropHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
