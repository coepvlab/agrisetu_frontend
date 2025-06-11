import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCropDetailsComponent } from './add-crop-details.component';

describe('AddCropDetailsComponent', () => {
  let component: AddCropDetailsComponent;
  let fixture: ComponentFixture<AddCropDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCropDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCropDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
