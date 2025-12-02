import { RouterLink } from "@angular/router"

export enum MatCardType {
    Currency = 'CURRENCY',
    Text = 'TEXT',
};

export interface ICardData {
    type: MatCardType,
    heading: string,
    description: string|number,
    image?: string,
    links?: [{label: string, route: string}]
};