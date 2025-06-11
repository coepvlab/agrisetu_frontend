import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerAddEquipmentsComponent } from './farmer-add-equipments.component';

describe('FarmerAddEquipmentsComponent', () => {
  let component: FarmerAddEquipmentsComponent;
  let fixture: ComponentFixture<FarmerAddEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerAddEquipmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerAddEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
