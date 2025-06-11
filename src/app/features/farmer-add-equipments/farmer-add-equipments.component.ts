import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FarmerService } from '../../core/services/farmer.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmer-add-equipments',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './farmer-add-equipments.component.html',
  styleUrl: './farmer-add-equipments.component.css'
})
export class FarmerAddEquipmentsComponent {
 constructor( private router: Router,private loader: NgxUiLoaderService,private farmerService:FarmerService) { }

 equipments = [
  { name: 'TRACTOR', category: 'Tillage', image: 'assets/equipments/tractor.jpg' },
  { name: 'PLOUGH', category: 'Tillage', image: 'assets/equipments/plough.png' },
  { name: 'HARROW', category: 'Tillage', image: 'assets/equipments/harrow.png' },
  { name: 'CULTIVATOR', category: 'Tillage', image: 'assets/equipments/cultivator.jpg' },

  { name: 'SEED_DRILL', category: 'Sowing', image: 'assets/equipments/Seed_Drill.jpg' },
  // { name: 'SEEDER', category: 'Sowing', image: 'assets/equipments/seeder.jpg' },
  { name: 'DIBBLER', category: 'Sowing', image: 'assets/equipments/dibbler.jpg' },

  { name: 'IRRIGATION_PUMP', category: 'Irrigation', image: 'assets/equipments/irrigation_pump.jpg' },
  { name: 'SPRINKLER', category: 'Irrigation', image: 'assets/equipments/sprinkler.jpg' },
  { name: 'DRIP_SYSTEM', category: 'Irrigation', image: 'assets/equipments/drip_system.jpg' },

  { name: 'AGROBOT_WEEDER', category: 'Weeding', image: 'assets/equipments/weeder.jpeg' },
  { name: 'CYCLE_WEEDER', category: 'Weeding', image: 'assets/equipments/cycle_weeder.png' },
  // { name: 'SICKLE', category: 'Harvesting', image: 'assets/equipments/sickle.jpg' },
  // { name: 'REAPER', category: 'Harvesting', image: 'assets/equipments/reaper.jpg' },

  { name: 'MINI_TRUCK', category: 'Transportation', image: 'assets/equipments/mini_truck.jpg' },
  { name: 'TRACTOR_TROLLY', category: 'Transportation', image: 'assets/equipments/tractor_trolley.jpg' },
  { name: 'BAILGADI', category: 'Transportation', image: 'assets/equipments/bailgadi.jpeg' },

  // { name: 'WHEELBARROW', category: 'Others', image: 'assets/equipments/wheelbarrow.jpg' },
  // { name: 'POWER_TILLER', category: 'Others', image: 'assets/equipments/power_tiller.jpg' },
  // { name: 'SPADE', category: 'Others', image: 'assets/equipments/spade.jpg' },
  // { name: 'HOE', category: 'Others', image: 'assets/equipments/hoe.jpg' },
  // { name: 'RAKE', category: 'Others', image: 'assets/equipments/rake.jpg' },
  // { name: 'SPRAYER', category: 'Others', image: 'assets/equipments/sprayer.jpg' }
];


  getCategories(): string[] {
    return [...new Set(this.equipments.map(crop => crop.category))];
  }

  getCropsByCategory(category: string) {
    return this.equipments.filter(crop => crop.category === category);
  }

  selectCrop(crop: any) {
    console.log('Selected Crop:', crop);
    // Navigate to detail page or form
  }

  selectedEquipments: any[] = [];

toggleCrop(crop: any) {
  const index = this.selectedEquipments.findIndex(c => c.name === crop.name);
  if (index > -1) {
    this.selectedEquipments.splice(index, 1);
  } else {
    this.selectedEquipments.push(crop);
  }
}

isSelected(crop: any): boolean {
  return this.selectedEquipments.some(c => c.name === crop.name);
}

removeCrop(crop: any) {
  this.selectedEquipments = this.selectedEquipments.filter(c => c.name !== crop.name);
}

continueWithoutAdding() {
  this.router.navigate(['/features/dashboard']);
}


saveAndNext(): void {
  console.log('Final Selected Crops:', this.selectedEquipments);

  if (!this.selectedEquipments || this.selectedEquipments.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'No Crops Selected',
      text: 'Please select at least one crop before submitting.',
      confirmButtonText: 'OK',
      width: '350px',
    });
    return;
  }

  const username = localStorage.getItem('username');
  if (!username) {
    Swal.fire({
      icon: 'error',
      title: 'User Not Found',
      text: 'Login required. Username is missing.',
      confirmButtonText: 'OK',
      width: '350px',
    });
    return;
  }

  this.loader.start(); // Start loader

  this.farmerService.updateSelectedCrops(this.selectedEquipments, username).subscribe({
    next: (response: any) => {
      this.loader.stop();
      console.log('Selected crops submitted successfully', response);

      Swal.fire({
        icon: 'success',
        title: 'Saved Successfully',
        text: 'Your crop selection has been saved!',
        width: '350px',
        padding: '1.5em',
        backdrop: true,
        customClass: {
          popup: 'swal2-rounded'
        }
      }).then(() => {
        this.router.navigate(['/features/dashboard']);
      });
    },
    error: (error: { error: { message: any; }; }) => {
      this.loader.stop();
      console.error('Error submitting crops:', error);

      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error?.error?.message || 'Failed to save selected crops. Please try again.',
        confirmButtonText: 'OK',
        width: '90%',
      });
    }
  });
}

}
