import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FarmerService } from '../../core/services/farmer.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,NgClass,TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 
   constructor(private router: Router, private loader: NgxUiLoaderService, private farmerService: FarmerService) { }
    role=localStorage.getItem('role');
  @Input() isSidebarOpen: boolean = true;
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  isWaterMenuOpen = false; // Controls Water Insights submenu

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
   goToLogin() {
     this.showFloatingEquipmentsMenu=false;
    this.router.navigate(['/login']);
  }

  gotoVegetables(){
     this.showFloatingEquipmentsMenu=false;
    this.router.navigate(['/features/vegetables']);
  }
  gotoDashboard(){
     this.showFloatingEquipmentsMenu=false;
    this.router.navigate(['/features/dashboard']);
  }
  gotoCropDetails(){
     this.showFloatingEquipmentsMenu=false;
    this.router.navigate(['/features/add-crops-details']);
  }

   gotoExpertAdvice(){
  this.showFloatingEquipmentsMenu=false;
  this.router.navigate(['/features/farmer-expert-advice']);
   }

   isEquipmentsOpen = false;

toggleEquipments() {
  this.isEquipmentsOpen = !this.isEquipmentsOpen;
}

gotoAddEquipment() {
  this.showFloatingEquipmentsMenu=false;
  this.router.navigate(['/features/farmer-add-equipments']);
}

gotoRentEquipment() {
  this.showFloatingEquipmentsMenu=false;
  this.router.navigate(['/features/farmer-rent-equipments']);
}

gotoHireEquipment() {
  this.showFloatingEquipmentsMenu=false;
  this.router.navigate(['/features/farmer-hire-equipments']);
}

gotoSaleEquipment() {
  this.showFloatingEquipmentsMenu=false;
  this.router.navigate(['/features/farmer-sale-equipments']);
}

gotoBuyEquipment() {
  this.showFloatingEquipmentsMenu=false;
  this.router.navigate(['/features/farmer-buy-equipments']);
}
 // Toggle Water Insights submenu
  toggleWaterMenu() {
    this.isWaterMenuOpen = !this.isWaterMenuOpen;
  }

  // Navigation methods
  gotoWater() {
     this.showFloatingEquipmentsMenu=false;
    this.router.navigate(['/features/farmer-water-insights']);
  }

  gotoFloodAlerts() {
     this.showFloatingEquipmentsMenu=false;
    this.router.navigate(['/water/flood-alerts']);
  }

  gotoAvailability() {
     this.showFloatingEquipmentsMenu=false;
    this.router.navigate(['/water/availability']);
  }

  gotoDrought() {
    this.router.navigate(['/water/drought']);
  }

  gotoRainfall() {
    this.router.navigate(['/water/rainfall']);
  }

  gotoCropHistory() {
  this.showFloatingEquipmentsMenu = false; // Close any open floating menus
  this.router.navigate(['/features/farmer-crop-history']);  // Replace with your actual route path
}


  showFloatingEquipmentsMenu = false;

onEquipmentsClick() {
  if (this.isSidebarOpen) {
    this.isEquipmentsOpen = !this.isEquipmentsOpen;
    this.showFloatingEquipmentsMenu = false; // Ensure floating menu is hidden
  } else {
    this.showFloatingEquipmentsMenu = !this.showFloatingEquipmentsMenu;
    this.isEquipmentsOpen = false; // Ensure normal submenu is hidden
  }
}

}
