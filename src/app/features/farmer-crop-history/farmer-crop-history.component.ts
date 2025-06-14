import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FarmerService } from '../../core/services/farmer.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-farmer-crop-history',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './farmer-crop-history.component.html',
  styleUrl: './farmer-crop-history.component.css'
})
export class FarmerCropHistoryComponent {

  selectedCrop = {
    name: 'Wheat',
    image: 'assets/wheat.jpg',
    plantingDate: '2024-12-15',
    pesticides: ['Pesticide A', 'Pesticide B'],
    diseases: ['Rust', 'Leaf spot'],
    lastUpdated: '2025-04-01'
  };

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

  username = localStorage.getItem('username');
  isSidebarCollapsed = false;
  selectedCropNames: string = '';
  selectedCropsToShow: any[] = [];


  ngOnInit(): void {
    this.getSelectedCropsByFarmer();
  }

  selectCrop(crop: any): void {
    this.selectedCrop = crop;
  }
  getCategories(): string[] {
    return [...new Set(this.crops.map(crop => crop.category))];
  }


  getSelectedCropsByFarmer(): void {
    const username = localStorage.getItem('username');
    if (!username) {
      console.error('Username not found in localStorage');
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
