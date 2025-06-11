import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerHireEquipmentsComponent } from './farmer-hire-equipments.component';

describe('FarmerHireEquipmentsComponent', () => {
  let component: FarmerHireEquipmentsComponent;
  let fixture: ComponentFixture<FarmerHireEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerHireEquipmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerHireEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
