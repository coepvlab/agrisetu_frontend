import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FarmerService } from '../../core/services/farmer.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-farmer-crop-history',
  standalone: true,
  imports: [TranslateModule, CommonModule,],
  templateUrl: './farmer-crop-history.component.html',
  styleUrl: './farmer-crop-history.component.css'
})
export class FarmerCropHistoryComponent {

  public environment = environment;


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
    { name: 'ADARAK', category: 'Vegetables', image: 'assets/adarak.webp' },
    { name: 'HALAD', category: 'Vegetables', image: 'assets/halad.webp' },

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
    { name: 'DRAGON_FRUIT', category: 'Others', image: 'assets/groundnut.jpg' },
  ];

  constructor(private router: Router, private loader: NgxUiLoaderService, private farmerService: FarmerService) { }

  username = sessionStorage.getItem('username');
  isSidebarCollapsed = false;
  selectedCropNames: string = '';
  selectedCropsToShow: any[] = [];
  selectedCropDetails: any[] = [];
  selectedCropName = '';


  ngOnInit(): void {
    this.getSelectedCropsByFarmer();

  }

  selectCrop(crop: any): void {
    this.selectedCropName = crop.name; // this is correct
    this.getCropHistory();

    setTimeout(() => {
      const section = document.getElementById('crop-history-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }


  getCropImageByName(cropName: string): string {
    const crop = this.crops.find(c => c.name.toLowerCase() === cropName.toLowerCase());
    return crop ? crop.image : 'assets/default-crop.jpg'; // Use a default fallback image if not found
  }


  getCropHistory(): void {
    this.farmerService.getCropHistory(this.username, this.selectedCropName).subscribe({
      next: (res) => {
        this.selectedCropDetails = res.data;
        if (res.data && res.data.length > 0) {
          this.selectedCropDetails.forEach((crop: any) => {
            crop.validWeedImages = crop.weedImageNames?.filter((img: string) => !!img?.trim()) || [];
            crop.validCropImages = crop.cropImageNames?.filter((img: string) => !!img?.trim()) || [];
          });
        } else {
          this.selectedCropDetails = []; // no data case
        }


      },
      error: (err) => {
        console.error('Failed to fetch crop history:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'Failed to fetch crop history'
        });
      }
    });
  }


  selectedImageUrl: string = '';
  bootstrap: any;

  onImageClick(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new Modal(modalElement); // use imported Modal class
      modal.show();
    }
  }



  getCategories(): string[] {
    return [...new Set(this.crops.map(crop => crop.category))];
  }


  getSelectedCropsByFarmer(): void {
    const username = sessionStorage.getItem('username');
    if (!username) {
      console.error('Username not found in sessionStorage');
      return;
    }
    this.farmerService.getSelectedCropsByFarmer(username).subscribe({
      next: (res) => {
        this.selectedCropNames = res.data;
        this.filterSelectedCrops();
      },
      error: (err) => {
        console.error('Error fetching crops:', err);
      }
    });
  }

  filterSelectedCrops(): void {
    const names = this.selectedCropNames
      .split(',')
      .map(name => name.trim().toLowerCase());

    this.selectedCropsToShow = this.crops.filter(crop =>
      names.includes(crop.name.toLowerCase())
    );
  }
}
