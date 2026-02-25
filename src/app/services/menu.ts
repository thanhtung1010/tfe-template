import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, ResolveFn, Route, Router } from '@angular/router';
import { MENU } from '@data';
import { IRouter } from '@interfaces';
import { arraySignal } from '@signals';
import { filter } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    protected readonly router = inject(Router);
    protected readonly destroyRef = inject(DestroyRef);

    public menu = arraySignal<IRouter>([]);

    init(): void {
        const menu = MENU.map((route) => {
            const parentPath = '';
            return this._genMenuItem(route, parentPath);
        }).filter((item) => !!item);

        this.menu.push(...menu);
        this.listenRouter();

        // Initial check
        this.updateMenuState(this.router.url);
    }

    protected listenRouter(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((event: NavigationEnd) => {
                this.updateMenuState(event.urlAfterRedirects);
            });
    }

    protected updateMenuState(url: string): void {
        const menu = this.menu.items();

        // Helper to recursively find and expand items
        const checkAndExpand = (items: IRouter[]): boolean => {
            let hasActiveChild = false;

            for (const item of items) {
                // Check if this item is active or part of the active path
                // Simple check: if current URL includes item path
                // Note: item.path starts with / and url starts with /

                // Better check: use exact match or verify if it's a parent
                // For this template, we can check if the url starts with the item path
                // But we need to be careful about partial matches (e.g. /u vs /user)

                // Let's recurse first to see if children are active
                let childActive = false;
                if (item.children) {
                    childActive = checkAndExpand(item.children);
                }

                // If a child is active, we must expand this item
                if (childActive) {
                    item.extend = true;
                    hasActiveChild = true;
                } else if (url === item.path || url.startsWith(item.path + '/')) {
                    // If this item itself is the active route or a parent of it (but we didn't find it via children recursion yet?)
                    // Actually, if we recurse, we find the leaf first.

                    // If we are at a leaf or intermediate node that matches the URL
                    if (url === item.path) {
                        hasActiveChild = true;
                        // We don't need to extend the item itself if it has no children, but if it does, maybe?
                        // Requirement: "check all parent of this activated item, if item extend is false, set it true"
                    }
                }
            }
            return hasActiveChild;
        };

        // Redoing logic to be more precise based on requirement:
        // "find active item, then check all parent of this activated item"

        // We can just traverse and keep a path stack.
        const traverse = (items: IRouter[], currentUrl: string): boolean => {
            for (const item of items) {
                if (item.path === currentUrl) {
                    return true;
                }

                if (item.children) {
                    const found = traverse(item.children, currentUrl);
                    if (found) {
                        item.extend = true;
                        return true;
                    }
                }
            }
            return false;
        };

        // We need to handle the case where the URL might have query params or be a deep route not in menu?
        // Assuming menu covers all navigation routes for now based on app.routes.ts mapping.

        // Clean url (remove query params)
        const urlPath = url.split('?')[0];

        // The menu paths generated in init() seem to include leading slash if parentPath was empty but path had it?
        // In data/router.ts: newPath = parentPath + '/' + path;
        // routes defined in app.routes.ts usually don't have leading slash.
        // So /path1/path2

        traverse(menu, urlPath);

        // We might want to trigger a signal update if we mutated deeply,
        // but since we mutated objects inside the array, Angular signals might not detect it if we only return the same array ref.
        // But we are mutating the properties of the objects.
        // To be safe and ensure UI updates, we can re-set the signal or use update.
        this.menu = arraySignal(menu);
    }

    private _genMenuItem = (router: IRouter, parentPath: string): IRouter => {
        const { path, title, children, level } = router;
        const newPath = parentPath + '/' + path;
        return {
            path: newPath,
            title,
            level,
            extend: false,
            icon: router.icon,
            children: children
                ? children.map((child) => this._genMenuItem(child, newPath))
                : undefined,
        };
    };
}
