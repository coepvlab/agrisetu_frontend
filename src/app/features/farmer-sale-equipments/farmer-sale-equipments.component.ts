import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FarmerService } from '../../core/services/farmer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-farmer-sale-equipments',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './farmer-sale-equipments.component.html',
  styleUrl: './farmer-sale-equipments.component.css'
})
export class FarmerSaleEquipmentsComponent {

  constructor( private router: Router,private loader: NgxUiLoaderService,private farmerService:FarmerService) { }

 equipments = [
    { name: 'TRACTOR', category: 'Tillage', image: 'assets/equipments/tractor.jpg' },
    { name: 'PLOUGH', category: 'Tillage', image: 'assets/equipments/plough.png' },
    { name: 'HARROW', category: 'Tillage', image: 'assets/equipments/harrow.png' },
    { name: 'CULTIVATOR', category: 'Tillage', image: 'assets/equipments/cultivator.jpg' },

    { name: 'SEED_DRILL', category: 'Sowing', image: 'assets/equipments/Seed_Drill.jpg' },
    { name: 'SEEDER', category: 'Sowing', image: 'assets/equipments/seeder.jpg' },
    { name: 'DIBBLER', category: 'Sowing', image: 'assets/equipments/dibbler.jpg' },

    { name: 'IRRIGATION_PUMP', category: 'Irrigation', image: 'assets/equipments/irrigation_pump.jpg' },
    { name: 'SPRINKLER', category: 'Irrigation', image: 'assets/equipments/sprinkler.jpg' },
    { name: 'DRIP_SYSTEM', category: 'Irrigation', image: 'assets/equipments/drip_system.jpg' },

    { name: 'MINI_TRUCK', category: 'Transportation', image: 'assets/equipments/mini_truck.jpg' },
    { name: 'TRACTOR_TROLLY', category: 'Transportation', image: 'assets/equipments/tractor_trolley.jpg' },
    { name: 'BAILGADI', category: 'Transportation', image: 'assets/equipments/bailgadi.jpeg' }
  ];

  selectedEquipment: any = null;

rentDetails = {
  contact: '',
  price: null,              // correct: price is null initially
};


  openRentForm(equipment: any) {
    this.selectedEquipment = equipment;
    this.rentDetails = {
      contact: '',
      price: null,
    };
  }

  submitRentForm() {
    console.log('Submitted Rent Info:', {
      ...this.selectedEquipment,
      ...this.rentDetails
    });

    // TODO: Send to backend
    this.selectedEquipment = null;
  }

  cancel() {
    this.selectedEquipment = null;
  }
}
