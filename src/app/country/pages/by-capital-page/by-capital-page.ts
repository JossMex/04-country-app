import { CountryService } from './../../services/country';
import {  Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../componentes/search-input/search-input";
import { CountryList } from "../../componentes/country-list/country-list";
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  CountryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query:string){
    if( this.isLoading() ) return;
    this.isLoading.set(true);
    this.isError.set(null);

    this.CountryService.searchBYcapital(query)
    .subscribe((countries) => {
      this.isLoading.set(false);
      this.countries.set(countries);
      console.log(countries);
    });
  }

}
