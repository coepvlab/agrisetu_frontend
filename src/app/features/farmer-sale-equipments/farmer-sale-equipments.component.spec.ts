import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerSaleEquipmentsComponent } from './farmer-sale-equipments.component';

describe('FarmerSaleEquipmentsComponent', () => {
  let component: FarmerSaleEquipmentsComponent;
  let fixture: ComponentFixture<FarmerSaleEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerSaleEquipmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerSaleEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
