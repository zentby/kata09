import { PriceType, Price, IPriceCalculator } from "../types";

export interface FlatPrice extends Price {}

export class FlatPriceCalculator implements IPriceCalculator {
    match(rule: string): boolean {
        return /^\w+\s+[\d\.]+$/.test(rule.trim());
    }
    normalise(rule: string): FlatPrice {
        const [sku, price] = rule.split(/\s+/);
        return {
            sku,
            type: PriceType.Flat,
            unitPrice: parseFloat(price),
        };
    }
    calculate(price: FlatPrice, quantity: number): number {
        return price.unitPrice * quantity;
    }
}
