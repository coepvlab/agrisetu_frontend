import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerRentEquipmentsComponent } from './farmer-rent-equipments.component';

describe('FarmerRentEquipmentsComponent', () => {
  let component: FarmerRentEquipmentsComponent;
  let fixture: ComponentFixture<FarmerRentEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerRentEquipmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerRentEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
