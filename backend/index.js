import puppeteer from "puppeteer";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/scrapeSCL", async (req, res) => {
    const query = req.query.searchQ || "DDR5 16GB 6000MHz CL30";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://sclgaming.in");
    // console.log(query);
    await page.type("input#dgwt-wcas-search-input-1", query);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    await page.screenshot({ path: "sclgaming.png" });

    let pageCount = 0
    let finalProducts = []
    while(pageCount<5) {
        const products = await page.evaluate(() => {
            const tempProductElement = document.querySelector(".e-con-inner h1.product_title");
            if (tempProductElement) {
                console.log("Single product page detected. Extracting product details.");
                const name = tempProductElement.innerText || "No name found";
                const price = document.querySelector(".price ins bdi")?.innerText || document.querySelector(".price bdi")?.innerText || "No price found";
                return [{ name, price }];
            }
            else {
                const productElements = document.querySelectorAll(".woocommerce-loop-product__link");
                console.log("Product elements found:", productElements.length);
                return Array.from(productElements).map((product) => {
                    const name = product.querySelector(".woocommerce-loop-product__title")?.innerText || "No name found";
                    const price = product.querySelector(".price ins bdi")?.innerText || product.querySelector(".price bdi")?.innerText || "No price found";
                    return { name, price };
                });
            }
        });
        finalProducts = [...finalProducts,...products]
        try {
            await page.click(".next")
            await page.waitForNavigation();
        } catch (error) {
            console.log("no next button found")
            break;
        }
        ++pageCount;
    }

    await browser.close();
    res.status(200).json(finalProducts);
});

app.get("/scrapePCS",async (req,res)=>{

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});