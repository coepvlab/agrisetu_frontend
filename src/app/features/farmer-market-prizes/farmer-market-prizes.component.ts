import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FarmerService } from '../../core/services/farmer.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmer-market-prizes',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './farmer-market-prizes.component.html',
  styleUrl: './farmer-market-prizes.component.css'
})
export class FarmerMarketPrizesComponent {

  crops = [
  { name: 'TOMATO', category: 'Vegetables', image: 'assets/tomato.jpg' },
  { name: 'POTATO', category: 'Vegetables', image: 'assets/potato.jpg' },
  { name: 'ONION', category: 'Vegetables', image: 'assets/onion.jpg' },
  { name: 'BRINJAL', category: 'Vegetables', image: 'assets/brinjal.jpg' },
  { name: 'CABBAGE', category: 'Vegetables', image: 'assets/cabbage.jpg' },
  { name: 'CAULIFLOWER', category: 'Vegetables', image: 'assets/cauliflower.jpg' },
  { name: 'CAPSICUM', category: 'Vegetables', image: 'assets/capsicum.jpg' },
  { name: 'GREEN_PEA', category: 'Vegetables', image: 'assets/green_pea.jpg' },
  { name: 'RED_BEAT', category: 'Vegetables', image: 'assets/red_beat.jpg' },
  { name: 'MULA', category: 'Vegetables', image: 'assets/mula.jpeg' },
  { name: 'DUDHI_BHOPLA', category: 'Vegetables', image: 'assets/dudhi_bhopla.webp' },
  { name: 'SHEVGA', category: 'Vegetables', image: 'assets/shevga.webp' },
  { name: 'GHEVDA', category: 'Vegetables', image: 'assets/ghevda.webp' },
  { name: 'KOTHIMBIR', category: 'Vegetable', image: 'assets/kothimbir.jpg' },
  { name: 'GAJAR', category: 'Vegetables', image: 'assets/gajar.jpg' },
  { name: 'SHEPU', category: 'Vegetable', image: 'assets/shepu.jpg' },
  { name: 'METHI', category: 'Vegetable', image: 'assets/methi.jpeg' },
  { name: 'KARLE', category: 'Vegetables', image: 'assets/karle.jpg' },
  { name: 'DODKA', category: 'Vegetables', image: 'assets/dodka.jpeg' },
  { name: 'GAWAR', category: 'Vegetables', image: 'assets/gawar.png' },
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
  { name: 'DRAGON_FRUIT',category: 'Others', image: 'assets/groundnut.jpg' },
 ];


   // Dummy prices for now – replace with backend logic
 private priceMap: { [key: string]: number } = {
  TOMATO: 25,
  POTATO: 18,
  ONION: 20,
  BRINJAL: 22,
  CABBAGE: 15,
  CAULIFLOWER: 18,
  CAPSICUM: 30,
  GREEN_PEA: 45,
  OKRA: 35,

  WHEAT: 2300,
  RICE: 2800,
  BAJRA: 2100,
  JOWAR: 2200,
  MAIZE: 1950,

  MOONG: 6000,
  CHANA: 5200,
  BLACK_GRAM: 6400,
  PIGEON_PEA: 5800,

  BANANA: 12,
  MANGO: 70,
  SAPOTA: 40,
  ORANGE: 45,
  PAPAYA: 20,
  GRAPES: 60,
  GUAVA: 35,
  POMEGRANATE: 90,
  WATERMELON: 18,
  STRAWBERRY: 160,

  COTTON: 7200,
  SUGARCANE: 310,
  CUCUMBER: 25,
  GARLIC: 90,
  GREEN_CHILLI: 65,
  GROUNDNUT: 5300,
  DRAGON_FRUIT: 140,

  // Added new vegetable names with placeholder prices
  RED_BEAT: 28,
  MULA: 22,
  DUDHI_BHOPLA: 20,
  SHEVGA: 35,
  GHEVDA: 40,
  KOTHIMBIR: 10,
  GAJAR: 24,
  SHEPU: 15,
  METHI: 18,
  KARLE: 30,
  DODKA: 28,
  GAWAR: 32
};


getUnitKey(category: string): string {
  if (category === 'Fruits' || category === 'Vegetables') return 'UNITS.KG';
  if (category === 'Grains' || category === 'Pulses' || category === 'Others') return 'UNITS.QUINTAL';
  return 'UNITS.UNIT';
}


  getPrice(cropName: string): number {
    return this.priceMap[cropName] || 0;
  }

  getUnit(category: string): string {
    if (category === 'Fruits' || category === 'Vegetables') return 'kg';
    if (category === 'Grains' || category === 'Pulses' || category === 'Others') return 'quintal';
    return 'unit';
  }
}
