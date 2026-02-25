import { AfterViewInit, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '@components';
import { TranslateService } from '@ngx-translate/core';
import { ConsoleGuardService, LanguageService, LayoutService, MenuService, SvgLoaderService } from '@services';
import { skip, debounceTime } from 'rxjs';

@Component({
    selector: 'tfe-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
    imports: [
        RouterOutlet,
        LayoutComponent,
    ],
})
export class App implements AfterViewInit {
    protected readonly lottie = signal(
        'https://lottie.host/9b524a98-c3d4-415f-b4f3-a79bf4c3d395/b1FArc0UlB.lottie'
    );
    private _timeoutLoading!: NodeJS.Timeout;
    private _spriteUrl: string = '/assets/svg/sprite.svg';

    protected readonly destroyRef = inject(DestroyRef);
    protected readonly languageService = inject(LanguageService);
    protected readonly layoutService = inject(LayoutService);
    protected readonly titleService = inject(Title);
    protected readonly translateService = inject(TranslateService);
    protected readonly consoleGuardService = inject(ConsoleGuardService);
    protected readonly menuService = inject(MenuService);
    protected readonly svgLoaderService = inject(SvgLoaderService);

    constructor() {
        this.languageService.init();
        this.consoleGuardService.init();
        this.menuService.init();
        if (this.layoutService.isBrowser()) {
            this.svgLoaderService.loadSprite(this._spriteUrl);
        }
    }

    ngAfterViewInit(): void {
        this.layoutService.loading$
            .pipe(
                skip(1),
                takeUntilDestroyed(this.destroyRef),
                debounceTime(500),
            )
            .subscribe((resp) => {
                this.layoutService.loading$ = !this.layoutService.loading$.value;

                if (this.layoutService.isBrowser()) {
                    this.layoutService.toggleScroll('app-root');
                }
            });

        this.layoutService.theme$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(theme => {
            this.layoutService.updateThemeClass(theme);
        });

        this.translateService.stream('PAGE_TITLE').pipe(takeUntilDestroyed(this.destroyRef)).subscribe((title: string) => {
            this.titleService.setTitle(title);
        });
    }

    lottieStartLoad() {
        if (this._timeoutLoading) {
            clearTimeout(this._timeoutLoading);
        }

        this._timeoutLoading = setTimeout(() => {
            this.layoutService.loading$ = !this.layoutService.loading$.value;
            clearTimeout(this._timeoutLoading);
        }, 1500);
    }
}
