import puppeteer from "puppeteer";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/scrape", async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://sclgaming.in");
    await page.type("input#dgwt-wcas-search-input-1", "DDR5 16GB 6000MHz CL30");
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    await page.screenshot({ path: "sclgaming.png" });

    const products = await page.evaluate(() => {
        const productElements = document.querySelectorAll(".woocommerce-loop-product__link");
        console.log("Product elements found:", productElements.length);
        return Array.from(productElements).map((product) => {
            const name = product.querySelector("h2.woocommerce-loop-product__title")?.innerText || "No name found";
            const price = product.querySelector(".price ins bdi")?.innerText || "No price found";
            return { name, price };
        });
    });

    console.log("Products:", products);
    await browser.close();
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});