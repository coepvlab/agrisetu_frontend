import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerExpertAdviceComponent } from './farmer-expert-advice.component';

describe('FarmerExpertAdviceComponent', () => {
  let component: FarmerExpertAdviceComponent;
  let fixture: ComponentFixture<FarmerExpertAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerExpertAdviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerExpertAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
