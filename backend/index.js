import puppeteer from "puppeteer";
import express from "express";
import cors from "cors";
import dbroutes from "./routes/dbroutes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express();
app.use(cors({ origin: "http://localhost:3000" ,credentials:true}));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

//middleware
app.use((req,res,next)=>{   
    console.log(req.method,req.url,req.body)
    next()
})

app.get("/scrapeSCL", async (req, res) => {
    try {
    const query = req.query.searchQ || "DDR5 16GB 6000MHz CL30";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://sclgaming.in");
    console.log(query);
    await page.type("input.e-search-input", query);
    await page.keyboard.press("Enter");
    await page.screenshot({ path: "sclgamingb.png" });
    await page.waitForSelector(".elementor-element-d85154a");
    await page.screenshot({ path: "sclgaminga.png" });

    let pageCount = 0
    let finalProducts = []
    while(pageCount<5) {
        const products = await page.evaluate(() => {
            const productElements = document.querySelectorAll(".elementor-element-d85154a");
            console.log("Product elements found:", productElements.length);
            return Array.from(productElements).map((product) => {
                const name = product.querySelector("h3 a")?.innerText || "No name found";
                const price = product.querySelector(".price ins bdi")?.innerText || product.querySelector(".price bdi")?.innerText || "No price found";
                return { name, price };
            });

            // const tempProductElement = document.querySelector(".elementor-loop-container");
            // if (tempProductElement) {
            //     console.log("Single product page detected. Extracting product details.");
            //     const name = tempProductElement.innerText || "No name found";
            //     const price = document.querySelector(".price ins bdi")?.innerText || document.querySelector(".price bdi")?.innerText || "No price found";
            //     return [{ name, price }];
            // }
            // else {
            //     const productElements = document.querySelectorAll(".woocommerce-loop-product__link");
            //     console.log("Product elements found:", productElements.length);
            //     return Array.from(productElements).map((product) => {
            //         const name = product.querySelector(".woocommerce-loop-product__title")?.innerText || "No name found";
            //         const price = product.querySelector(".price ins bdi")?.innerText || product.querySelector(".price bdi")?.innerText || "No price found";
            //         return { name, price };
            //     });
            // }
        });
        finalProducts = [...finalProducts,...products]
        // finalProducts = finalProducts.filter(product => product.name.includes(query))
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
    } 
    catch (error) {
        res.status(500).send("error scraping SCL Gaming: " + error.message);
    }
    
});

app.get("/scrapePCS",async (req,res)=>{

});

app.use("/usedb",dbroutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});