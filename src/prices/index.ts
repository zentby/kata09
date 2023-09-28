import { normalise, calculate } from "./calculators";
import { Price } from "./types";

export class SKUPrice {
    priceInfo: Price;

    constructor(rule: string) {
        this.priceInfo = normalise(rule);
    }

    public get sku(): string {
        return this.priceInfo.sku;
    }

    public calculate(quantity: number): number {
        return calculate(this.priceInfo, quantity);
    }
}
