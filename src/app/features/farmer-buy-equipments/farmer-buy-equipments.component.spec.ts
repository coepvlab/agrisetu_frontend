import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerBuyEquipmentsComponent } from './farmer-buy-equipments.component';

describe('FarmerBuyEquipmentsComponent', () => {
  let component: FarmerBuyEquipmentsComponent;
  let fixture: ComponentFixture<FarmerBuyEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerBuyEquipmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerBuyEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
