import { Component, input, computed } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { Location } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information.html',
})
export class CountryInformation {

  country = input.required<Country>();

  currentYear = computed(() => {return new Date().getFullYear();});

  location = inject(Location);

  goBack(){
    this.location.back();

  }


 }
