export enum PriceType {
    Flat = "Flat",
    Multipriced = "Multipriced",
    // etc.
}

export interface Price {
    sku: string;
    type: PriceType;
    unitPrice: number;
}

export interface IPriceCalculator {
    match(rule: string): boolean;
    normalise(rule: string): Price;
    calculate(price: Price, quantity: number): number;
}
