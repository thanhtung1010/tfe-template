import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { IRouter } from '@interfaces';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'tfe-aside-item',
    templateUrl: './aside-item.html',
    imports: [RouterLinkActive, RouterLink, TranslateModule]
})
export class AsideItemComponent implements OnChanges {
    @Input({ required: true }) item!: IRouter;

    protected padding: number = 0;
    protected readonly paddingStep: number = 16;

    ngOnChanges(changes: SimpleChanges): void {
        this.checkPadding();
    }

    protected checkPadding(): void {
        const level = this.item.level - 1;
        this.padding = level * this.paddingStep;
    }
}
