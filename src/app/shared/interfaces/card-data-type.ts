export enum CardType {
    Currency = 'CURRENCY',
    Text = 'TEXT',
};

export interface ICardData {
    type: CardType,
    heading: string,
    description: string|number,
    image?: string,
    links?: [{label: string, route: string}]
};