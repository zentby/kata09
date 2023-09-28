import { expect, describe, it } from "vitest";
import { FlatPriceCalculator } from ".";
import { PriceType } from "../types";

describe("Test flat price normaliser", () => {
    const calculator = new FlatPriceCalculator();
    describe("Test flat price formatting", () => {
        it("should return true when data is matched", () => {
            // Arrange
            const data = "A 50";
            // Act
            const result = calculator.match(data);
            // Assert
            expect(result).toBe(true);
        });
        it("should return false when data is not matched", () => {
            // Arrange
            const data = "A 50 3 for 130";
            // Act
            const result = calculator.match(data);
            // Assert
            expect(result).toBe(false);
        });
        it("should return correct data when data is matched", () => {
            // Arrange
            const data = "A 50";
            // Act
            const result = calculator.normalise(data);
            // Assert
            expect(result).toEqual({
                sku: "A",
                type: PriceType.Flat,
                unitPrice: 50,
            });
        });
    });
    describe("Test flat price calculation", () => {
        it("should return correct price when it is flat price", () => {
            // Arrange
            const skuData = {
                sku: "A",
                type: PriceType.Flat,
                unitPrice: 50,
            };
            const quantity = 2;
            // Act
            const result = calculator.calculate(skuData, quantity);
            // Assert
            expect(result).toBe(100);
        });
    });
});
