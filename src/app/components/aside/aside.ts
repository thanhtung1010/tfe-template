import { Component, inject } from '@angular/core';
import { MenuService } from '@services';
import { AsideItemComponent } from '../aside-item/aside-item';

@Component({
    selector: 'tfe-aside',
    templateUrl: './aside.html',
    imports: [AsideItemComponent],
})
export class AsideComponent {
    protected readonly menuService = inject(MenuService);
    protected menu = this.menuService.menu;

    constructor() {}
}
