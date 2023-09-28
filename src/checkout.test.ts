import { describe, it, expect } from "vitest";
import { Checkout } from "./checkout";

describe("Test checkout calculation", () => {
    const getCalculator = () =>
        new Checkout(`
        A 50
        B 30 2 for 45
        `);

    it("should throw an error when sku is invalid", () => {
        // Arrange
        const calculator = getCalculator();
        const sku = "C";
        // Act
        const action = () => calculator.scan(sku);
        // Assert
        expect(action).toThrowError(`Invalid SKU: ${sku}`);
    });

    describe("Test flat price", () => {
        it("should return correct price when it is flat price", () => {
            // Arrange
            const calculator = getCalculator();
            const sku = "A";
            // Act
            calculator.scan(sku);
            // Assert
            expect(calculator.totalAmount).toBe(50);
        });
    });

    describe("Test multipriced price", () => {
        it("should return correct price when it is multipriced", () => {
            // Arrange
            const calculator = getCalculator();
            const sku = "B";
            // Act
            calculator.scan(sku);
            // Assert
            expect(calculator.totalAmount).toBe(30);
        });

        it("should return correct price when multipriced item match the quantity", () => {
            // Arrange
            const calculator = getCalculator();
            const sku = "B";
            // Act
            calculator.scan(sku);
            calculator.scan(sku);
            // Assert
            expect(calculator.totalAmount).toBe(45);
        });
    });
});

describe("Test checkout", () => {
    const RULES = `
    A     50       3 for 130
    B     30       2 for 45
    C     20
    D     15`;
    it("test totals", () => {
        expect(Checkout.price(RULES, "")).toBe(0);
        expect(Checkout.price(RULES, "A")).toBe(50);
        expect(Checkout.price(RULES, "AB")).toBe(80);
        expect(Checkout.price(RULES, "CDBA")).toBe(115);

        expect(Checkout.price(RULES, "AA")).toBe(100);
        expect(Checkout.price(RULES, "AAA")).toBe(130);
        expect(Checkout.price(RULES, "AAAA")).toBe(180);
        expect(Checkout.price(RULES, "AAAAA")).toBe(230);
        expect(Checkout.price(RULES, "AAAAAA")).toBe(260);

        expect(Checkout.price(RULES, "AAAB")).toBe(160);
        expect(Checkout.price(RULES, "AAABB")).toBe(175);
        expect(Checkout.price(RULES, "AAABBD")).toBe(190);
        expect(Checkout.price(RULES, "DABABA")).toBe(190);
    });

    it("test incremental totals", () => {
        const co = Checkout.new(RULES);
        expect(co.totalAmount).toBe(0);
        co.scan("A");
        expect(co.totalAmount).toBe(50);
        co.scan("B");
        expect(co.totalAmount).toBe(80);
        co.scan("A");
        expect(co.totalAmount).toBe(130);
        co.scan("A");
        expect(co.totalAmount).toBe(160);
        co.scan("B");
        expect(co.totalAmount).toBe(175);
    });
});
