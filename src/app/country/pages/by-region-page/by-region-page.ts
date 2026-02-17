import { CountryService } from './../../services/country';
import { Component, inject, signal } from '@angular/core';
import { CountryList } from "../../componentes/country-list/country-list";
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {

  countryService = inject(CountryService);

public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region | null>(null);


  countryResource = rxResource({
    request: () => ({region: this.selectedRegion()}),
    loader: ({request}) =>{
      if(!request.region) return of([]);
      return  this.countryService.searchByregion(request.region);
    }
  })



 }
