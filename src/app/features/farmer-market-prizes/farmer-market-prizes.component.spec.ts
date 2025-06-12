import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerMarketPrizesComponent } from './farmer-market-prizes.component';

describe('FarmerMarketPrizesComponent', () => {
  let component: FarmerMarketPrizesComponent;
  let fixture: ComponentFixture<FarmerMarketPrizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerMarketPrizesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerMarketPrizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
