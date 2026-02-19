import { CountryService } from './../../services/country';
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryList } from "../../componentes/country-list/country-list";
import { Region } from '../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = (this.activatedRoute.snapshot.queryParamMap.get('region') ?? '') as Region;

  selectedRegion = linkedSignal<Region | null>(() => this.queryParam ?? 'Americas');


  countryResource = rxResource({
    request: () => ({region: this.selectedRegion()}),
    loader: ({request}) =>{
      if(!request.region) return of([]);

       this.router.navigate(['/country/by-region'],{
        queryParams: {
          region: request.region,
        }
      });

      return  this.countryService.searchByregion(request.region);
    }
  })



 }
