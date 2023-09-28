import { Checkout } from "./checkout";

const main = () => {
    const RULES = `
    A     50       3 for 130
    B     30       2 for 45
    C     20
    D     15`;

    const input = process.argv[2];
    const calculator = new Checkout(RULES);
    input.split("").forEach((sku) => calculator.scan(sku));
    console.log(calculator.totalAmount);
};

main();
