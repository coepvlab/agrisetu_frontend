import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { FarmerService } from '../../core/services/farmer.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  sliderImages = [
    'assets/farmer1.jpg',
    'assets/farm.jpg',
    'assets/farmer4.png',
    'assets/farmer_slide1.jpg'
  ];

  cropsSlider = [
    { name: 'Wheat', image: 'assets/wheat.jpg' },
    { name: 'Rice', image: 'assets/rice.jpg' },
    { name: 'Sugarcane', image: 'assets/sugarcane.jpg' },
    { name: 'Cotton', image: 'assets/cotton.jpg' },
    { name: 'Corn', image: 'assets/maize.jpg' }
  ];

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
  { name: 'DRAGON_FRUIT',category: 'Others', image: 'assets/groundnut.jpg' },
 ];


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


  equipmentsNames: any;
  equipmentsToShow: { name: string; category: string; image: string; }[] | undefined;

  constructor(private router: Router, private loader: NgxUiLoaderService, private farmerService: FarmerService) { }

  username = sessionStorage.getItem('username');
  isSidebarCollapsed = false;
  selectedCropNames: string = '';
  selectedCropsToShow: any[] = [];


  ngOnInit(): void {
    this.getSelectedCropsByFarmer();
    this.getFarmerEquipments();
  }

  getCategories(): string[] {
    return [...new Set(this.crops.map(crop => crop.category))];
  }

  selectCrop(crop: any) {
    console.log('Selected Crop:', crop);
    // Navigate to detail page or form
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

  getFarmerEquipments(): void {
    const username = sessionStorage.getItem('username');
    if (!username) {
      console.error('Username not found in sessionStorage');
      return;
    }
    this.farmerService.getFarmerEquipments(username).subscribe({
      next: (res) => {
        this.equipmentsNames = res.data;
        this.filterEquipments();
      },
      error: (err) => {
        console.error('Error fetching crops:', err);
      }
    });
  }

  filterEquipments(): void {
  const names = this.equipmentsNames
    .split(',')
    .map((name: string) => name.trim().toLowerCase());

  this.equipmentsToShow = this.equipments.filter(equipment =>
    names.includes(equipment.name.toLowerCase())
  );
}

filterSelectedCrops(): void {
  const names = this.selectedCropNames
    .split(',')
    .map(name => name.trim().toLowerCase());

  this.selectedCropsToShow = this.crops.filter(crop =>
    names.includes(crop.name.toLowerCase())
  );
}

redirectToAddCrops(name:any){
  this.router.navigate(['/features/add-crops-details', name])
}


}
