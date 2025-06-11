import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'; // <-- Direct import
import { VegetablesComponent } from './vegetables/vegetables.component';
import { AddCropDetailsComponent } from './add-crop-details/add-crop-details.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { FarmerAddEquipmentsComponent } from './farmer-add-equipments/farmer-add-equipments.component';
import { FarmerRentEquipmentsComponent } from './farmer-rent-equipments/farmer-rent-equipments.component';
import { FarmerSaleEquipmentsComponent } from './farmer-sale-equipments/farmer-sale-equipments.component';
import { FarmerBuyEquipmentsComponent } from './farmer-buy-equipments/farmer-buy-equipments.component';
import { FarmerHireEquipmentsComponent } from './farmer-hire-equipments/farmer-hire-equipments.component';
import { FarmerWaterInsightsComponent } from './farmer-water-insights/farmer-water-insights.component';
import { FarmerCropHistoryComponent } from './farmer-crop-history/farmer-crop-history.component';
import { FarmerExpertAdviceComponent } from './farmer-expert-advice/farmer-expert-advice.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
   {
    path: 'vegetables',
    component: VegetablesComponent
  },
  {
    path: 'add-crops-details',
    component: AddCropDetailsComponent
  },
  {
    path: 'equipments',
    component: EquipmentsComponent
  },
  {
    path: 'farmer-add-equipments',
    component: FarmerAddEquipmentsComponent
  },
  {
    path: 'farmer-rent-equipments',
    component: FarmerRentEquipmentsComponent
  },
  {
    path: 'farmer-sale-equipments',
    component: FarmerSaleEquipmentsComponent
  },
  {
    path: 'farmer-buy-equipments',
    component: FarmerBuyEquipmentsComponent
  },
  {
    path: 'farmer-hire-equipments',
    component: FarmerHireEquipmentsComponent
  },
   {
    path: 'farmer-water-insights',
    component: FarmerWaterInsightsComponent
  },
  {
    path: 'farmer-crop-history',
    component: FarmerCropHistoryComponent
  },
  {
    path: 'farmer-expert-advice',
    component: FarmerExpertAdviceComponent
  },
  // Add more child routes if needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
