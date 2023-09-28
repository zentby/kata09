import { Price, PriceType, IPriceCalculator } from "./types";
import { FlatPriceCalculator } from "./flat";
import { MultipricedPriceCalculator } from "./multipriced";

export const calculators: { [key in PriceType]: IPriceCalculator } = {
    [PriceType.Flat]: new FlatPriceCalculator(),
    [PriceType.Multipriced]: new MultipricedPriceCalculator(),
};

export function normalise(rule: string): Price {
    const normaliser = Object.values(calculators).find((calculator) =>
        calculator.match(rule)
    );
    if (!normaliser) {
        throw new Error(`Invalid rule: ${rule}`);
    }
    return normaliser.normalise(rule);
}

export function calculate(price: Price, quantity: number): number {
    const calculator = calculators[price.type];
    if (!calculator) {
        throw new Error(`Invalid price type: ${price.type}`);
    }
    return calculator.calculate(price, quantity);
}
