import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFarmerHistoryComponent } from './admin-farmer-history.component';

describe('AdminFarmerHistoryComponent', () => {
  let component: AdminFarmerHistoryComponent;
  let fixture: ComponentFixture<AdminFarmerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFarmerHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFarmerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
