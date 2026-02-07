import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";



export class CountryMapper {

  //static RestCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      name: restCountry.name.common,
      cca2: restCountry.cca2,
      capital: restCountry.capital.join(', '),
      population: restCountry.population,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg
    };
  }

  //static RestCountry[] => Country[]
  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }

}
