import { Price, PriceType, IPriceCalculator } from "../types";

export interface MultipricedPrice extends Price {
    specialPrice: {
        quantity: number;
        price: number;
    };
}

export class MultipricedPriceCalculator implements IPriceCalculator {
    static regex = /^(\w+)\s+([\d\.]+)\s+(\d+) for ([\d\.]+)$/;
    match(rule: string): boolean {
        return MultipricedPriceCalculator.regex.test(rule.trim());
    }
    normalise(rule: string): MultipricedPrice {
        const [sku, unitPrice, quantity, price] =
            rule.match(MultipricedPriceCalculator.regex)?.slice(1) ?? [];
        return {
            sku,
            type: PriceType.Multipriced,
            unitPrice: parseFloat(unitPrice),
            specialPrice: {
                quantity: parseInt(quantity),
                price: parseFloat(price),
            },
        };
    }
    calculate(price: MultipricedPrice, quantity: number): number {
        const specialPrice = price.specialPrice;
        if (!specialPrice) {
            throw new Error(`Invalid special price for SKU: ${price.sku}`);
        }
        const specialPriceQuantity = Math.floor(
            quantity / specialPrice.quantity
        );
        const specialPriceRemainder = quantity % specialPrice.quantity;
        return (
            specialPriceQuantity * specialPrice.price +
            specialPriceRemainder * price.unitPrice
        );
    }
}
