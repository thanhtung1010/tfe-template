export interface IRouter {
    path: string,
    title: string,
    level: number,
    icon?: string,
    extend?: boolean,
    children?: IRouter[]
};