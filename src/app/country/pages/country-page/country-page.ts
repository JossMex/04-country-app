import { CountryService } from './../../services/country';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  imports: [],
  templateUrl: './country-page.html',
})
export class CountryPage {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResources = rxResource({
    request: () => ({code: this.countryCode}),
    loader: ({ request}) => {
    return this.countryService.searchCountryByAlphaCode(request.code);
    }
  });
 }
