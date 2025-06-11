import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerWaterInsightsComponent } from './farmer-water-insights.component';

describe('FarmerWaterInsightsComponent', () => {
  let component: FarmerWaterInsightsComponent;
  let fixture: ComponentFixture<FarmerWaterInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerWaterInsightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerWaterInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
