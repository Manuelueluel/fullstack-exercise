import { Component } from '@angular/core';
import { ApiPaths } from '../api-paths';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  //Oggetto configurazione navbar
  navbar = {
    brand: $localize`Fullstack-exercise`,
    links: [
      { path: `${ApiPaths.student}`, text: $localize`Students page` },
      { path: `${ApiPaths.corso}`, text: $localize`Courses page` },
    ],
  };
}

export interface navLink {
  path: string;
  text: string;
}
