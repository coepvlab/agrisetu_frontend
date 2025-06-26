import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AdminService } from '../../core/services/admin.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { Modal } from 'bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-farmer-history',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './admin-farmer-history.component.html',
  styleUrl: './admin-farmer-history.component.css'
})
export class AdminFarmerHistoryComponent {
  public environment = environment;
  farmers: any;
  farmerHistory: any;
  selectedFarmerName: any;
  selectedFarmerId: any;
  selectedFarmer:any;
  selectedImageUrl: string = '';
  selectedUsername: any;
  selectedCropsToShow: any[] = [];
  selectedCropDetails: any[] = [];
  noDataMessage: string = '';


  constructor(private router: Router, private loader: NgxUiLoaderService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllFarmersList();

  }

  getAllFarmersList(): void {
    this.adminService.getAllFarmersList().subscribe({
      next: (res) => {
        this.farmers = res;
        console.log(this.farmers, 'this.farmers');
      },
      error: (err) => {
        console.error('Failed to fetch crop history:', err);

      }
    });
  }

 

getFarmerHistory(farmer: any) {
  const id = farmer.id;
  const firstName = farmer.firstName;
  const lastName = farmer.lastName;
  this.selectedFarmerName = `${firstName} ${lastName}`;
  this.selectedUsername = farmer.username;

  this.adminService.getFarmerHistory(id).subscribe({
    next: (res) => {
      this.farmerHistory = res.data;

      if (this.farmerHistory && this.farmerHistory.length > 0) {
        this.noDataMessage = ''; // clear message
        this.farmerHistory.forEach((crop: any) => {
          crop.validWeedImages = crop.weedImageNames?.filter((img: string) => !!img?.trim()) || [];
          crop.validCropImages = crop.cropImageNames?.filter((img: string) => !!img?.trim()) || [];
        });
      } else {
        this.farmerHistory = [];
        this.noDataMessage = 'No available data for this farmer';
      }
    },
    error: (err) => {
      console.error('Failed to fetch crop history:', err);
      this.noDataMessage = 'Error fetching crop history';
    }
  });
}


  onImageClick(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new Modal(modalElement); // use imported Modal class
      modal.show();
    }
  }

}
