export interface IRouter {
    path: string,
    title: string,
    level: number,
    extend?: boolean,
    children?: IRouter[]
};