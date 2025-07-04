import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FarmerService } from '../../core/services/farmer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-crop-details',
  standalone: true,
  imports: [TranslateModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-crop-details.component.html',
  styleUrl: './add-crop-details.component.css'
})
export class AddCropDetailsComponent {

  name: string = '';
  username = sessionStorage.getItem('username') || '';

  constructor(private route: ActivatedRoute, private router: Router, private loader: NgxUiLoaderService, private farmerService: FarmerService) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name') || '';
    this.crop.cropName = this.name;
  }

  // Crop model with name, date, pesticides, fertilizers, etc.
  crop = {
    pesticides: '',
    pesticideDate: '',
    fertilizers: '',
    fertilizerDate: '',
    weedicideName: '',
    weedRemoval: '',
    disease: '',
    weedName: '',
    sowingDate: '',
    cropName: '',
    latitude: 0,
    longitude: 0,
    timestamp: '',
    address: ''
  };


  cropImages: any[] = [];
  weedImages: any[] = [];

  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('cropCameraInput') cropCameraInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cropUploadInput') cropUploadInput!: ElementRef<HTMLInputElement>;
  @ViewChild('weedCameraInput') weedCameraInput!: ElementRef<HTMLInputElement>;
  @ViewChild('weedUploadInput') weedUploadInput!: ElementRef<HTMLInputElement>;

// 🚀 Reusable method to set location before file input
private async setCropLocationDetails() {
  const { latitude, longitude, address } = await this.getLocationAndAddress();
  const timestamp = new Date().toLocaleString();

  this.crop.latitude = latitude;
  this.crop.longitude = longitude;
  this.crop.address = address;
  this.crop.timestamp = timestamp;
}

// 🌾 Crop Camera Button Click
async triggerCropCamera() {
  await this.setCropLocationDetails();
  this.cropCameraInput.nativeElement.click();
}

// 🌾 Crop Upload (from gallery)
async triggerCropUpload() {
  await this.setCropLocationDetails();
  this.cropUploadInput.nativeElement.click();
}

// 🌿 Weed Camera Button Click
async triggerWeedCamera() {
  await this.setCropLocationDetails();
  this.weedCameraInput.nativeElement.click();
}

// 🌿 Weed Upload
async triggerWeedUpload() {
  await this.setCropLocationDetails();
  this.weedUploadInput.nativeElement.click();
}

  async onCropFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const { latitude, longitude, address } = await this.getLocationAndAddress();
      const timestamp = new Date().toLocaleString();

      // Save to crop object
      this.crop.latitude = latitude;
      this.crop.longitude = longitude;
      this.crop.timestamp = timestamp;
      this.crop.address = address;

      for (let file of files) {
        const preview = await this.overlayImageWithGeo(file);
        this.cropImages.push(preview);
      }
    }
  }



  async onWeedFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let file of files) {
        const preview = await this.overlayImageWithGeo(file);
        this.weedImages.push(preview);
      }
    }
  }


  async overlayImageWithGeo(file: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Use reader.result directly as preview
        resolve({
          preview: reader.result
        });
      };

      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file); // Important!
    });
  }


  async getLocationAndAddress(): Promise<any> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ latitude: 0, longitude: 0, address: 'Geolocation not supported' });
      return;
    }

    // Force fresh location using maximumAge = 0
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        let address = 'Address not found';

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.display_name) {
            address = data.display_name;
          }
        } catch (e) {
          console.warn('Reverse geocoding failed:', e);
        }

        resolve({ latitude, longitude, address });
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        resolve({ latitude: 0, longitude: 0, address: 'Location unavailable' });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0 // Force fresh location
      }
    );
  });
}


  onSubmit() {
    const formData = new FormData();

    // Add crop object with location info
    formData.append('cropData', JSON.stringify(this.crop));

    // Attach images
    this.cropImages.forEach((img, index) => {
      const blob = this.dataURLtoBlob(img.preview);
      formData.append('cropImages', blob, `crop_${index}.jpg`);
    });

    this.weedImages.forEach((img, index) => {
      const blob = this.dataURLtoBlob(img.preview);
      formData.append('weedImages', blob, `weed_${index}.jpg`);
    });

    this.loader.start(); // Start loader

    this.farmerService.uploadCropData(formData, this.username).subscribe({
      next: (res) => {
        this.loader.stop(); // Stop loader

        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Successfully submitted',
            text: res.message,
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.resetCropForm(); // Reset form and image previews
             this.router.navigate(['/features/dashboard']);
          });

        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Unexpected Response',
            text: res.message || 'Unexpected status code.',
          });
        }
      },
      error: (err) => {
        this.loader.stop(); // Stop loader

        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: err.error?.message || 'Something went wrong',
        });
      }
    });

  }


  dataURLtoBlob(dataURL: string): Blob {
    const parts = dataURL.split(';base64,');
    const mime = parts[0].split(':')[1];
    const byteString = atob(parts[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
  }


  resetCropForm() {
    this.crop = {
      pesticides: '',
      pesticideDate: '',
      fertilizers: '',
      fertilizerDate: '',
      weedicideName: '',
      weedRemoval: '',
      disease: '',
      weedName: '',
      sowingDate: '',
      cropName: '',
      latitude: 0,
      longitude: 0,
      timestamp: '',
      address: ''
    };

    this.cropImages = [];
    this.weedImages = [];

    // Optionally reset input fields if needed
    if (this.cropCameraInput) this.cropCameraInput.nativeElement.value = '';
    if (this.cropUploadInput) this.cropUploadInput.nativeElement.value = '';
    if (this.weedCameraInput) this.weedCameraInput.nativeElement.value = '';
    if (this.weedUploadInput) this.weedUploadInput.nativeElement.value = '';
  }



  testMethod() {
    this.farmerService.testUpload(this.username).subscribe({
      next: (res) => {
        console.log('Upload successful', res);
        // Optionally reset form or show success message
      },
      error: (err) => {
        console.error('Upload failed', err);
      }
    });
  }
}

// selectedFile!: File;

// onFileSelected(event: any) {
//   const file: File = event.target.files[0];
//   if (file) {
//     this.selectedFile = file;
//   }
// }
// uploadImage(){
//   const formData = new FormData();
//   formData.append("image", this.selectedFile);
//   this.farmerService.uploadImageToServer(formData, this.username).subscribe({
//     next: (res) => {
//       console.log(res);
//     },
//     error: (err) => {
//       console.error('Error fetching crops:', err);
//     }
//   });

// }




