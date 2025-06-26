import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FarmerService } from '../../core/services/farmer.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-vegetables',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './vegetables.component.html',
  styleUrl: './vegetables.component.css'
})
export class VegetablesComponent {

  constructor( private router: Router,private loader: NgxUiLoaderService,private farmerService:FarmerService) { }

  crops = [
  { name: 'TOMATO', category: 'Vegetables', image: 'assets/tomato.jpg' },
  { name: 'POTATO', category: 'Vegetables', image: 'assets/potato.jpg' },
  { name: 'ONION', category: 'Vegetables', image: 'assets/onion.jpg' },
  { name: 'BRINJAL', category: 'Vegetables', image: 'assets/brinjal.jpg' },
  { name: 'CABBAGE', category: 'Vegetables', image: 'assets/cabbage.jpg' },
  { name: 'CAULIFLOWER', category: 'Vegetables', image: 'assets/cauliflower.jpg' },
  { name: 'CAPSICUM', category: 'Vegetables', image: 'assets/capsicum.jpg' },
  { name: 'GREEN_PEA', category: 'Vegetables', image: 'assets/green_pea.jpg' },
  { name: 'OKRA', category: 'Vegetables', image: 'assets/okra.jpg' },

  { name: 'RED_BEAT', category: 'Vegetables', image: 'assets/red_beat.jpg' },
  { name: 'MULA', category: 'Vegetables', image: 'assets/mula.jpeg' },
  { name: 'DUDHI_BHOPLA', category: 'Vegetables', image: 'assets/dudhi_bhopla.webp' },
  { name: 'SHEVGA', category: 'Vegetables', image: 'assets/shevga.webp' },
  { name: 'GHEVDA', category: 'Vegetables', image: 'assets/ghevda.webp' },
  { name: 'KOTHIMBIR', category: 'Vegetables', image: 'assets/kothimbir.jpg' },
  { name: 'GAJAR', category: 'Vegetables', image: 'assets/gajar.jpg' },
  { name: 'SHEPU', category: 'Vegetables', image: 'assets/shepu.jpg' },
  { name: 'METHI', category: 'Vegetables', image: 'assets/methi.jpeg' },
  { name: 'KARLE', category: 'Vegetables', image: 'assets/karle.jpg' },
  { name: 'DODKA', category: 'Vegetables', image: 'assets/dodka.jpeg' },
  { name: 'GAWAR', category: 'Vegetables', image: 'assets/gawar.png' },

  { name: 'WHEAT', category: 'Grains', image: 'assets/wheat.jpg' },
  { name: 'RICE', category: 'Grains', image: 'assets/paddy.jpg' },
  { name: 'BAJRA', category: 'Grains', image: 'assets/bajra.jpg' },
  { name: 'JOWAR', category: 'Grains', image: 'assets/jowar.jpg' },
  { name: 'MAIZE', category: 'Grains', image: 'assets/maize.jpg' },
  { name: 'MOONG', category: 'Pulses', image: 'assets/moong.jpg' },
  { name: 'CHANA', category: 'Pulses', image: 'assets/chana.jpg' },
  { name: 'BLACK_GRAM', category: 'Pulses', image: 'assets/udid.jpg' },
  { name: 'PIGEON_PEA', category: 'Pulses', image: 'assets/PigeonPea.jpg' },
  { name: 'BANANA', category: 'Fruits', image: 'assets/banana.jpg' },
  { name: 'MANGO', category: 'Fruits', image: 'assets/mango.jpg' },
  { name: 'SAPOTA', category: 'Fruits', image: 'assets/sapota.jpg' },
  { name: 'ORANGE', category: 'Fruits', image: 'assets/orange.jpg' },
  { name: 'PAPAYA', category: 'Fruits', image: 'assets/papaya.jpg' },
  { name: 'GRAPES', category: 'Fruits', image: 'assets/grapes.jpg' },
  { name: 'GUAVA', category: 'Fruits', image: 'assets/guava.jpg' },
  { name: 'POMEGRANATE', category: 'Fruits', image: 'assets/pomegranate.jpg' },
  { name: 'WATERMELON', category: 'Fruits', image: 'assets/watermelon.jpg' },
  { name: 'STRAWBERRY', category: 'Fruits', image: 'assets/strawberry.jpg' },
  { name: 'COTTON', category: 'Others', image: 'assets/cotton.jpg' },
  { name: 'SUGARCANE', category: 'Others', image: 'assets/sugarcane.jpg' },
  { name: 'CUCUMBER', category: 'Others', image: 'assets/cucumber.jpg' },
  { name: 'GARLIC', category: 'Others', image: 'assets/garlic.jpg' },
  { name: 'GREEN_CHILLI', category: 'Others', image: 'assets/green_chilli.jpg' },
  { name: 'GROUNDNUT', category: 'Others', image: 'assets/groundnut.jpg' },
  { name: 'DRAGON_FRUIT',category: 'Others', image: 'assets/groundnut.jpg' },
 ];


  getCategories(): string[] {
    return [...new Set(this.crops.map(crop => crop.category))];
  }

  getCropsByCategory(category: string) {
    return this.crops.filter(crop => crop.category === category);
  }

  selectCrop(crop: any) {
    console.log('Selected Crop:', crop);
    // Navigate to detail page or form
  }

  selectedCrops: any[] = [];

toggleCrop(crop: any) {
  const index = this.selectedCrops.findIndex(c => c.name === crop.name);
  if (index > -1) {
    this.selectedCrops.splice(index, 1);
  } else {
    this.selectedCrops.push(crop);
  }
}

isSelected(crop: any): boolean {
  return this.selectedCrops.some(c => c.name === crop.name);
}

removeCrop(crop: any) {
  this.selectedCrops = this.selectedCrops.filter(c => c.name !== crop.name);
}

continueWithoutAdding() {
  this.router.navigate(['/features/dashboard']);
}

// saveAndNext() {
//   console.log('Final Selected Crops:', this.selectedCrops);

//   this.router.navigate(['/features/dashboard']);
// }

saveAndNext(): void {
  console.log('Final Selected Crops:', this.selectedCrops);

  if (!this.selectedCrops || this.selectedCrops.length === 0) {
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

  this.farmerService.updateSelectedCrops(this.selectedCrops, username).subscribe({
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
