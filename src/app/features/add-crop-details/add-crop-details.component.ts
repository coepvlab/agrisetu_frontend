import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FarmerService } from '../../core/services/farmer.service';

@Component({
  selector: 'app-add-crop-details',
  standalone: true,
  imports: [TranslateModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-crop-details.component.html',
  styleUrl: './add-crop-details.component.css'
})
export class AddCropDetailsComponent {
name: string = '';
username = localStorage.getItem('username') || '';

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
    weedicideName:'',
    weedRemoval:'',
    disease:'',
    weedName:'',
    sowingDate:'',
    cropName:''
  };

   @ViewChild('cameraInput') cameraInput!: ElementRef<HTMLInputElement>;
  @ViewChild('uploadInput') uploadInput!: ElementRef<HTMLInputElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  cropImages: any[] = [];

  // triggerCamera() {
   
  // }

  triggerCamera() {
     this.cameraInput.nativeElement.click();
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      alert(`Latitude: ${pos.coords.latitude}\nLongitude: ${pos.coords.longitude}`);
    },
    (err) => {
      alert('Error: ' + err.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000
    }
  );
}

  triggerUpload() {
    this.uploadInput.nativeElement.click();
  } 

  async onFileChange(event: any, fromCamera: boolean) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let file of files) {
        const preview = await this.overlayImageWithGeo(file);
        this.cropImages.push(preview);
      }
    }
  }

  async overlayImageWithGeo(file: File): Promise<any> {
  const reader = new FileReader();
  const image = new Image();

  return new Promise<any>((resolve) => {
    reader.onload = async () => {
      image.src = reader.result as string;

      image.onload = async () => {
        const canvas = this.canvasRef.nativeElement;
        const ctx = canvas.getContext('2d')!;
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const { latitude, longitude, address } = await this.getLocationAndAddress();
        const timestamp = new Date().toLocaleString();

        // Overlay background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, canvas.height - 110, canvas.width, 110);

        // Overlay text
        ctx.fillStyle = 'white';
        ctx.font = '24px sans-serif';
        ctx.fillText(`Lat: ${latitude.toFixed(6)} | Lon: ${longitude.toFixed(6)}`, 20, canvas.height - 80);
        ctx.fillText(`Time: ${timestamp}`, 20, canvas.height - 50);
        ctx.fillText(`Addr: ${address.substring(0, 80)}...`, 20, canvas.height - 20);

        const preview = canvas.toDataURL('image/jpeg');

        resolve({
          preview,
          latitude,
          longitude,
          timestamp,
          address
        });
      };
    };
    reader.readAsDataURL(file);
  });
}


  async getLocationAndAddress(): Promise<any> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ latitude: 0, longitude: 0, address: 'Geolocation not supported' });
      return;
    }

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
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}

  removePhoto(index: number) {
    this.cropImages.splice(index, 1);
  }

  sendDataToServer(){
    this.farmerService.CallAPIToSendData(this.crop, this.username).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching crops:', err);
      }
    });
  }


   selectedFile!: File;

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}
  uploadImage(){
    const formData = new FormData();
    formData.append("image", this.selectedFile);
    this.farmerService.uploadImageToServer(formData, this.username).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching crops:', err);
      }
    });
    
  }
}



