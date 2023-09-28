import { expect, describe, it } from "vitest";
import { MultipricedPriceCalculator } from ".";
import { PriceType } from "../types";

describe("Test multipriced calculator", () => {
    const calculator = new MultipricedPriceCalculator();
    describe("Test multipriced price formatting", () => {
        it("should return true when data is matched", () => {
            // Arrange
            const data = "A 50 3 for 130";
            // Act
            const result = calculator.match(data);
            // Assert
            expect(result).toBe(true);
        });
        it("should return false when data is not matched", () => {
            // Arrange
            const data = "A 50";
            // Act
            const result = calculator.match(data);
            // Assert
            expect(result).toBe(false);
        });
        it("should return correct data when data is matched", () => {
            // Arrange
            const data = "A 50 3 for 130";
            // Act
            const result = calculator.normalise(data);
            // Assert
            expect(result).toEqual({
                sku: "A",
                type: PriceType.Multipriced,
                unitPrice: 50,
                specialPrice: {
                    quantity: 3,
                    price: 130,
                },
            });
        });
    });

    describe("Test multipriced price calculation", () => {
        it("should return correct price when it is multipriced", () => {
            // Arrange
            const skuData = {
                sku: "B",
                type: PriceType.Multipriced,
                unitPrice: 30,
                specialPrice: { quantity: 2, price: 45 },
            };
            const quantity = 2;
            // Act
            const result = calculator.calculate(skuData, quantity);
            // Assert
            expect(result).toBe(45);
        });

        it("should return correct price when multipriced item match the quantity", () => {
            // Arrange
            const skuData = {
                sku: "B",
                type: PriceType.Multipriced,
                unitPrice: 30,
                specialPrice: { quantity: 2, price: 45 },
            };
            const quantity = 4;
            // Act
            const result = calculator.calculate(skuData, quantity);
            // Assert
            expect(result).toBe(90);
        });

        it("should return correct price when multipriced item does not match the quantity", () => {
            // Arrange
            const skuData = {
                sku: "B",
                type: PriceType.Multipriced,
                unitPrice: 30,
                specialPrice: { quantity: 2, price: 45 },
            };
            const quantity = 5;
            // Act
            const result = calculator.calculate(skuData, quantity);
            // Assert
            expect(result).toBe(120);
        });
    });
});
