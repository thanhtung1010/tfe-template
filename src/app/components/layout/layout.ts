import { Component } from '@angular/core';
import { MainComponent } from '../main/main';
import { AsideComponent } from '../aside/aside';

@Component({
    selector: 'tfe-layout',
    templateUrl: './layout.html',
    imports: [
        MainComponent,
        AsideComponent,
    ],
})
export class LayoutComponent {}
