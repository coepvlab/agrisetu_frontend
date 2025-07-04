import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FarmerService } from '../../core/services/farmer.service';
@Component({
  selector: 'app-add-crops',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-crops.component.html',
  styleUrl: './add-crops.component.css'
})
export class AddCropsComponent {


  constructor( private router: Router,private loader: NgxUiLoaderService,private farmerService:FarmerService) { }

 crops = [
  { name: 'Tomato', category: 'Vegetables', image: 'assets/tomato.jpg' },
  { name: 'Potato', category: 'Vegetables', image: 'assets/potato.jpg' },
  { name: 'Onion', category: 'Vegetables', image: 'assets/onion.jpg' },
  { name: 'Brinjal', category: 'Vegetables', image: 'assets/brinjal.jpg' },
  { name: 'Cabbage', category: 'Vegetables', image: 'assets/cabbage.jpg' },
  { name: 'Cauliflower', category: 'Vegetables', image: 'assets/cauliflower.jpg' },
  { name: 'Capsicum', category: 'Vegetables', image: 'assets/capsicum.jpg' },
  { name: 'Green Pea', category: 'Vegetables', image: 'assets/green_pea.jpg' },
  { name: 'Okra', category: 'Vegetables', image: 'assets/okra.jpg' },

   { name: 'Wheat', category: 'Grains', image: 'assets/wheat.jpg' },
  { name: 'Rice', category: 'Grains', image: 'assets/paddy.jpg' },
  { name: 'Bajra', category: 'Grains', image: 'assets/bajra.jpg' },
  { name: 'Jowar', category: 'Grains', image: 'assets/jowar.jpg' },
  { name: 'Maize', category: 'Grains', image: 'assets/maize.jpg' },


    { name: 'Moong', category: 'Pulses', image: 'assets/moong.jpg' },
  { name: 'Chana', category: 'Pulses', image: 'assets/chana.jpg' },
  { name: 'Black Gram', category: 'Pulses', image: 'assets/udid.jpg' },
  { name: 'Pigeon Pea', category: 'Pulses', image: 'assets/PigeonPea.jpg' },


  { name: 'Banana', category: 'Fruits', image: 'assets/banana.jpg' },
  { name: 'Mango', category: 'Fruits', image: 'assets/mango.jpg' },
  { name: 'Sapota', category: 'Fruits', image: 'assets/sapota.jpg' },
  { name: 'Orange', category: 'Fruits', image: 'assets/orange.jpg' },
  { name: 'Papaya', category: 'Fruits', image: 'assets/papaya.jpg' },
  { name: 'Grapes', category: 'Fruits', image: 'assets/grapes.jpg' },
  { name: 'Guava', category: 'Fruits', image: 'assets/guava.jpg' },
  { name: 'Pomegranate', category: 'Fruits', image: 'assets/pomegranate.jpg' },
   { name: 'Watermelon', category: 'Fruits', image: 'assets/watermelon.jpg' },
   { name: 'Strawberry', category: 'Fruits', image: 'assets/strawberry.jpg' },


  { name: 'Cotton', category: 'Others', image: 'assets/cotton.jpg' },
  { name: 'Sugarcane', category: 'Others', image: 'assets/sugarcane.jpg' },
  { name: 'Cucumber', category: 'Others', image: 'assets/cucumber.jpg' },
  { name: 'Garlic', category: 'Others', image: 'assets/garlic.jpg' },
  { name: 'Green Chilli', category: 'Others', image: 'assets/green_chilli.jpg' },
  // { name: 'Dry Chilli', category: 'Others', image: 'assets/dry_chilli.jpg' },
  { name: 'Groundnut', category: 'Others', image: 'assets/groundnut.jpg' },
  { name: 'Dragon Fruit', category: 'Others', image: 'assets/dragon_fruit.jpg' },


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

  const username = sessionStorage.getItem('username');
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

  this.farmerService.submitSelectedCrops(this.selectedCrops, username).subscribe({
    next: (response) => {
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
    error: (error) => {
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
