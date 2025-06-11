import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FarmerService } from '../../core/services/farmer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-farmer-hire-equipments',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule],
  templateUrl: './farmer-hire-equipments.component.html',
  styleUrl: './farmer-hire-equipments.component.css'
})
export class FarmerHireEquipmentsComponent {

   constructor( private router: Router,private loader: NgxUiLoaderService,private farmerService:FarmerService) { }
availableEquipments = [
  {
    name: 'TRACTOR',
    category: 'Tillage',
    image: 'assets/equipments/tractor.jpg',
    contact: '9876543210',
    price: 800,
    durationType: 'Per Day',
    owner: 'Ramesh Patil'
  },
  {
    name: 'PLOUGH',
    category: 'Tillage',
    image: 'assets/equipments/plough.png',
    contact: '9876543211',
    price: 300,
    durationType: 'Per Day',
    owner: 'Suresh Jadhav'
  },
  {
    name: 'HARROW',
    category: 'Tillage',
    image: 'assets/equipments/harrow.png',
    contact: '9876543212',
    price: 350,
    durationType: 'Per Day',
    owner: 'Ganesh More'
  },
  {
    name: 'CULTIVATOR',
    category: 'Tillage',
    image: 'assets/equipments/cultivator.jpg',
    contact: '9876543213',
    price: 400,
    durationType: 'Per Day',
    owner: 'Ajay Pawar'
  },
  {
    name: 'SEED_DRILL',
    category: 'Sowing',
    image: 'assets/equipments/Seed_Drill.jpg',
    contact: '9876543214',
    price: 500,
    durationType: 'Per Day',
    owner: 'Vaibhav Shinde'
  },
  {
    name: 'DIBBLER',
    category: 'Sowing',
    image: 'assets/equipments/dibbler.jpg',
    contact: '9876543216',
    price: 250,
    durationType: 'Per Day',
    owner: 'Anil Chavan'
  },
  {
    name: 'IRRIGATION_PUMP',
    category: 'Irrigation',
    image: 'assets/equipments/irrigation_pump.jpg',
    contact: '9876543217',
    price: 600,
    durationType: 'Per Day',
    owner: 'Rohit Deshmukh'
  },
  {
    name: 'SPRINKLER',
    category: 'Irrigation',
    image: 'assets/equipments/sprinkler.jpg',
    contact: '9876543218',
    price: 350,
    durationType: 'Per Day',
    owner: 'Nitin Bhosale'
  },
  {
    name: 'DRIP_SYSTEM',
    category: 'Irrigation',
    image: 'assets/equipments/drip_system.jpg',
    contact: '9876543219',
    price: 700,
    durationType: 'Per Day',
    owner: 'Kiran Patil'
  },
  {
    name: 'MINI_TRUCK',
    category: 'Transportation',
    image: 'assets/equipments/mini_truck.jpg',
    contact: '9876543220',
    price: 1000,
    durationType: 'Per Day',
    owner: 'Ravi Naik'
  },
  {
    name: 'TRACTOR_TROLLY',
    category: 'Transportation',
    image: 'assets/equipments/tractor_trolley.jpg',
    contact: '9876543221',
    price: 900,
    durationType: 'Per Day',
    owner: 'Mahesh Kumbhar'
  },
  {
    name: 'BAILGADI',
    category: 'Transportation',
    image: 'assets/equipments/bailgadi.jpeg',
    contact: '9876543222',
    price: 200,
    durationType: 'Per Day',
    owner: 'Prakash Kamble'
  }
];


selectedForHire: any = null;

hireDetails = {
  name: '',
  contact: '',
  duration: ''
};

openHireForm(eq: any) {
  this.selectedForHire = eq;
  this.hireDetails = {
    name: '',
    contact: '',
    duration: ''
  };
}

submitHireForm() {
  console.log('Hire Request Submitted:', {
    equipment: this.selectedForHire,
    userRequest: this.hireDetails
  });

  // TODO: Call backend API to send request
  this.selectedForHire = null;
}

cancelHire() {
  this.selectedForHire = null;
}

}
