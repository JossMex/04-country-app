import { CountryService } from './../../services/country';
import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from "../../componentes/search-input/search-input";
import { CountryList } from "../../componentes/country-list/country-list";
import { first, firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService);
  query = signal('');

  // con promesas
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.searchBYcapital(request.query);
    }
  });

  // con observables
  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     if (!request.query) return [];
  //     return await firstValueFrom(this.countryService.searchBYcapital(request.query));
  //   }
  // });

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query:string){
  //   if( this.isLoading() ) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.CountryService.searchBYcapital(query)
  //   .subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (error) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set( error);
  //     }
  //   });
  // }

}
