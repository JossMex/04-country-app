import { CountryService } from './../../services/country';
import {Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInput } from "../../componentes/search-input/search-input";
import { CountryList } from "../../componentes/country-list/country-list";
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {

  CountryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);



  //con promesas
  countryResource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) =>{
      if(!request.query) return of([]);

      this.router.navigate(['/country/by-country'],{
        queryParams: {
          query: request.query,

        }
      })

      return  this.CountryService.searchByCountry(request.query);
    }
  })

  //con observables
  // countryResource = resource({
  //   request: () => ({query: this.query()}),
  //   loader: async({request}) =>{
  //     if(!request.query) return [];
  //     return await firstValueFrom(this.CountryService.searchByCountry(request.query));
  //   }
  // })

}
