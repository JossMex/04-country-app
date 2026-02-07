import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenu } from "../../componentes/top-menu/top-menu";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopMenu],
  templateUrl: './CountryLayout.html',
})
export class CountryLayout { }
