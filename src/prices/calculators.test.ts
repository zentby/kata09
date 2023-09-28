import { describe, expect, it } from "vitest";
import { PriceType } from "./types";
import { calculate, calculators, normalise } from "./calculators";

describe("Test calculators", () => {
    it("should have all types of calculators", () => {
        for (const type in PriceType) {
            expect(calculators).toHaveProperty(type);
        }
    });
});

describe("Test normalise", () => {
    it("should throw an error when rule is invalid", () => {
        // Arrange
        const rule = "A 50 A";
        // Act
        const action = () => normalise(rule);
        // Assert
        expect(action).toThrowError(`Invalid rule: ${rule}`);
    });

    it("should return correct data when rule is valid", () => {
        // Arrange
        const rule = "A 50";
        // Act
        const result = normalise(rule);
        // Assert
        expect(result).toEqual({
            sku: "A",
            type: PriceType.Flat,
            unitPrice: 50,
        });
    });
});

describe("Test calculate", () => {
    it("should throw an error when price type is invalid", () => {
        // Arrange
        const price = {
            sku: "A",
            type: "invalid" as PriceType,
            unitPrice: 50,
        };
        const quantity = 1;
        // Act
        const action = () => calculate(price, quantity);
        // Assert
        expect(action).toThrowError(`Invalid price type: ${price.type}`);
    });

    it("should return correct price when it is flat price", () => {
        // Arrange
        const price = {
            sku: "A",
            type: PriceType.Flat,
            unitPrice: 50,
        };
        const quantity = 1;
        // Act
        const result = calculate(price, quantity);
        // Assert
        expect(result).toBe(50);
    });
});
