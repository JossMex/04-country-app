import {Component } from '@angular/core';
import { SearchInput } from "../../componentes/search-input/search-input";
import { CountryList } from "../../componentes/country-list/country-list";

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {



}
