import { SKUPrice } from "./prices";

export class Checkout {
    private items: { [sku: string]: number } = {};
    private allSku: { [key: string]: SKUPrice } = {};

    constructor(rules: string) {
        rules
            .split(/\n/)
            .map((line) => line.trim())
            .filter(Boolean)
            .forEach((rule) => this.addSku(rule));
    }

    public static new(rules: string): Checkout {
        return new Checkout(rules);
    }

    private addSku(rule: string): void {
        const skuPrice = new SKUPrice(rule);
        this.allSku[skuPrice.sku] = skuPrice;
    }

    scan(sku: string): void {
        const item = this.allSku[sku];
        if (!item) {
            throw new Error(`Invalid SKU: ${sku}`);
        }
        this.items[sku] = (this.items[sku] ?? 0) + 1;
    }

    public static price(rules: string, skus: string): number {
        const checkout = Checkout.new(rules);
        skus.split("").forEach((sku) => checkout.scan(sku));
        return checkout.totalAmount;
    }

    get totalAmount(): number {
        let total = 0;
        for (const [sku, quantity] of Object.entries(this.items)) {
            total += this.allSku[sku].calculate(quantity);
        }
        return total;
    }
}
