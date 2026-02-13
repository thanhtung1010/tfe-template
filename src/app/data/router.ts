import { IRouter } from '@interfaces';


export const ROUTERS = {
    HOME: '',
    SEARCH_SELECTION: 'search-selection',
    AUTOCOMPLETE: 'autocomplete',
    LISTBOX: 'listbox',
    SELECT: 'select',
    MULTISELECT: 'multiselect',
    COMBOBOX: 'combobox',

    NAVIGATION: 'navigation',
    MENU: 'menu',
    MENUBAR: 'menubar',
    TOOLBAR: 'toolbar',

    CONTENT: 'content',
    ACCORDION: 'accordion',
    TABS: 'tabs',
    TREE: 'tree',
    GRID: 'grid'
} as const;

export const MENU: IRouter[] = [
    {
        path: ROUTERS.HOME,
        title: 'ROUTER.HOME',
        level: 1
    },
    {
        path: ROUTERS.SEARCH_SELECTION,
        title: 'ROUTER.SEARCH_SELECTION',
        level: 1,
        children: [
            {
                path: ROUTERS.AUTOCOMPLETE,
                title: 'ROUTER.AUTOCOMPLETE',
                level: 2
            },
            {
                path: ROUTERS.LISTBOX,
                title: 'ROUTER.LISTBOX',
                level: 2
            },
            {
                path: ROUTERS.SELECT,
                title: 'ROUTER.SELECT',
                level: 2
            },
            {
                path: ROUTERS.MULTISELECT,
                title: 'ROUTER.MULTISELECT',
                level: 2
            },
            {
                path: ROUTERS.COMBOBOX,
                title: 'ROUTER.COMBOBOX',
                level: 2
            },
        ]
    },
    {
        path: ROUTERS.NAVIGATION,
        title: 'ROUTER.NAVIGATION',
        level: 1,
        children: [
            {
                path: ROUTERS.MENU,
                title: 'ROUTER.MENU',
                level: 2
            },
            {
                path: ROUTERS.MENUBAR,
                title: 'ROUTER.MENUBAR',
                level: 2
            },
            {
                path: ROUTERS.TOOLBAR,
                title: 'ROUTER.TOOLBAR',
                level: 2
            },
        ]
    },
    {
        path: ROUTERS.CONTENT,
        title: 'ROUTER.CONTENT',
        level: 1,
        children: [
            {
                path: ROUTERS.ACCORDION,
                title: 'ROUTER.ACCORDION',
                level: 2
            },
            {
                path: ROUTERS.TABS,
                title: 'ROUTER.TABS',
                level: 2
            },
            {
                path: ROUTERS.TREE,
                title: 'ROUTER.TREE',
                level: 2
            },
            {
                path: ROUTERS.GRID,
                title: 'ROUTER.GRID',
                level: 2
            },
        ]
    },
];