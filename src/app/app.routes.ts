import { Routes } from '@angular/router';
import { ROUTERS } from '@data';
import { titleResolver } from '@resolvers';

export const routes: Routes = [
    {
        path: ROUTERS.HOME,
        title: titleResolver('ROUTER.HOME'),
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
    },
    {
        path: ROUTERS.SEARCH_SELECTION,
        title: titleResolver('ROUTER.SEARCH_SELECTION'),
        children: [
            {
                path: ROUTERS.AUTOCOMPLETE,
                title: titleResolver('ROUTER.AUTOCOMPLETE'),
                loadComponent: () => import('./pages/search-selection/autocomplete/autocomplete').then(m => m.AutocompleteComponent)
            },
            {
                path: ROUTERS.LISTBOX,
                title: titleResolver('ROUTER.LISTBOX'),
                loadComponent: () => import('./pages/search-selection/listbox/listbox').then(m => m.ListboxComponent)
            },
            {
                path: ROUTERS.SELECT,
                title: titleResolver('ROUTER.SELECT'),
                loadComponent: () => import('./pages/search-selection/select/select').then(m => m.SelectComponent)
            },
            {
                path: ROUTERS.MULTISELECT,
                title: titleResolver('ROUTER.MULTISELECT'),
                loadComponent: () => import('./pages/search-selection/multiselect/multiselect').then(m => m.MultiselectComponent)
            },
            {
                path: ROUTERS.COMBOBOX,
                title: titleResolver('ROUTER.COMBOBOX'),
                loadComponent: () => import('./pages/search-selection/combobox/combobox').then(m => m.ComboboxComponent)
            },
        ]
    },
    {
        path: ROUTERS.NAVIGATION,
        title: titleResolver('ROUTER.NAVIGATION'),
        children: [
            {
                path: ROUTERS.MENU,
                title: titleResolver('ROUTER.MENU'),
                loadComponent: () => import('./pages/navigation/menu/menu').then(m => m.MenuComponent)
            },
            {
                path: ROUTERS.MENUBAR,
                title: titleResolver('ROUTER.MENUBAR'),
                loadComponent: () => import('./pages/navigation/menubar/menubar').then(m => m.MenubarComponent)
            },
            {
                path: ROUTERS.TOOLBAR,
                title: titleResolver('ROUTER.TOOLBAR'),
                loadComponent: () => import('./pages/navigation/toolbar/toolbar').then(m => m.ToolbarComponent)
            },
        ]
    },
    {
        path: ROUTERS.CONTENT,
        title: titleResolver('ROUTER.CONTENT'),
        children: [
            {
                path: ROUTERS.ACCORDION,
                title: titleResolver('ROUTER.ACCORDION'),
                loadComponent: () => import('./pages/content/accordion/accordion').then(m => m.AccordionComponent)
            },
            {
                path: ROUTERS.TABS,
                title: titleResolver('ROUTER.TABS'),
                loadComponent: () => import('./pages/content/tabs/tabs').then(m => m.TabsComponent)
            },
            {
                path: ROUTERS.TREE,
                title: titleResolver('ROUTER.TREE'),
                loadComponent: () => import('./pages/content/tree/tree').then(m => m.TreeComponent)
            },
            {
                path: ROUTERS.GRID,
                title: titleResolver('ROUTER.GRID'),
                loadComponent: () => import('./pages/content/grid/grid').then(m => m.GridComponent)
            },
        ]
    },
    {
        path: '**',
        pathMatch: 'prefix',
        redirectTo: ROUTERS.HOME
    }
];
