const getGoodsData = async (browser, categoryName, catogoryUrl) => {
    let data = null;

    try {
        let page = await browser.newPage();

        console.log(`Navigating to ${catogoryUrl}...`);
        await page.goto(catogoryUrl);

        const scrapedData = [];
        let id = 0;

        const scrapeCurrentPage = async (page) => {
            await page.waitForSelector("#maincontent");

            let isGoodsExist = false;
            let goods = null;

            try {
                goods = await page.$eval(
                    "#products ol li .product-block .product-item-box .product-item-info .product-item-details .product-item-details-top",
                    (a) => a.href
                );
                isGoodsExist = true;
            } catch (error) {
                isGoodsExist = false;
            }

            if (isGoodsExist) {
                let urls = await page.$$eval(
                    "#products ol li .product-block .product-item-box .product-item-info .product-item-details",
                    (links) => {
                        links = links.map(
                            (link) =>
                                link.querySelector(
                                    ".product-item-details-top > .product-item-name > a"
                                ).href
                        );
                        links = links.filter(
                            (link, index) => links.indexOf(link) === index
                        );
                        return links;
                    }
                );
                // console.log(urls);

                let pagePromise = (link, id) =>
                    new Promise(async (resolve, reject) => {
                        let dataObj = {};
                        let newPage = await browser.newPage();
                        await newPage.setViewport({
                            width: 1024,
                            height: 780,
                            deviceScaleFactor: 1,
                        });
                        await newPage.goto(link, { timeout: 90000 });

                        dataObj["goodId"] = id;
                        dataObj["goodUrl"] = link;

                        try {
                            dataObj["goodTitle"] = await newPage.$eval(
                                "h1",
                                (text) => text.textContent
                            );
                        } catch (error) {
                            dataObj["goodTitle"] = "Product name not defined";
                        }

                        /**
                         * Finding Price selector Begin
                         */
                        let isFirstPriceSelector = false;
                        let firstPriceSelector = null;

                        try {
                            firstPriceSelector = await newPage.$eval(
                                ".container .price",
                                (text) => text.textContent
                            );
                            isFirstPriceSelector = true;
                        } catch (error) {
                            isFirstPriceSelector = false;
                        }

                        if (isFirstPriceSelector) {
                            dataObj["goodPrice"] = await newPage.$eval(
                                ".container .price",
                                (text) => text.textContent.replace(/(\D)/gm, "")
                            );
                        }
                        // Finding Price selector End

                        dataObj["goodSeller"] = "Meguiar's";

                        /**
                         * Finding Image selector Begin
                         */
                        let isFirstImgSelector = false;
                        let firstImgSelector = null;

                        try {
                            firstImgSelector = await newPage.$eval(
                                ".container a.MagicZoom",
                                (a) => a.href
                            );
                            isFirstImgSelector = true;
                        } catch (error) {
                            isFirstImgSelector = false;
                        }

                        if (isFirstImgSelector) {
                            dataObj["goodImgUrl"] = await newPage.$eval(
                                ".container a.MagicZoom",
                                (a) => a.href
                            );
                        }

                        let isAdditionalImgSelector = false;
                        let additionalImgSelector = null;

                        try {
                            additionalImgSelector = await newPage.$eval(
                                ".mcs-items-container > .mcs-item > a",
                                (a) => a.href
                            );
                            isAdditionalImgSelector = true;
                        } catch (error) {
                            isAdditionalImgSelector = false;
                        }

                        if (isAdditionalImgSelector) {
                            let additionalImgUrls = await newPage.$$eval(
                                ".mcs-items-container .mz-thumb",
                                (el) =>
                                    el.map((el) => {
                                        return el.href;
                                    })
                            );

                            dataObj["goodImgUrl2"] = additionalImgUrls;
                        }
                        //Finding Image selector End

                        dataObj["goodBrand"] = "Meguiar's";

                        /**
                         * Finding Code selector Begin
                         */
                        let isFirstCodeSelector = false;
                        let firstCodeSelector = null;

                        try {
                            isFirstCodeSelector = await newPage.$eval(
                                ".page-title-wrapper > .attribute > .value",
                                (text) => text.textContent
                            );
                            isFirstCodeSelector = true;
                        } catch (error) {
                            isFirstCodeSelector = false;
                        }

                        if (isFirstCodeSelector) {
                            dataObj["goodCode"] = await newPage.$eval(
                                ".page-title-wrapper > .attribute > .value",
                                (text) => text.textContent.trim()
                            );
                        }
                        //Finding Code selector End

                        /**
                         * Finding Status selector Begin
                         */
                        let isFirstStatusSelector = false;
                        let firstStatusSelector = null;

                        try {
                            isFirstStatusSelector = await newPage.$eval(
                                ".amstockstatus",
                                (text) => text.textContent
                            );
                            isFirstStatusSelector = true;
                        } catch (error) {
                            isFirstStatusSelector = false;
                        }

                        if (isFirstStatusSelector) {
                            let goodStatus = await newPage.$eval(
                                ".container .product-info-stock-sku .amstockstatus",
                                (text) => text.textContent.trim()
                            );

                            goodStatus === "В наличии"
                                ? (dataObj["goodStatus"] = "В наличии ")
                                : (dataObj["goodStatus"] = "Предзаказ");
                        }
                        //Finding Status selector End

                        /**
                         * Finding Description selector Begin
                         */
                        let isFirstDescriptionSelector = false;
                        let firstDescriptionSelector = null;

                        try {
                            firstDescriptionSelector = await newPage.$eval(
                                "#desc",
                                (text) => text.textContent
                            );
                            isFirstDescriptionSelector = true;
                        } catch (error) {
                            isFirstDescriptionSelector = false;
                        }

                        if (isFirstDescriptionSelector) {
                            dataObj["goodDescription"] = await newPage.$eval(
                                "#desc",
                                (text) =>
                                    text &&
                                    text.textContent.replace(/\s+/g, " ")
                            );
                        }
                        //Finding Description selector End

                        /**
                         * Finding Usage selector Begin
                         */
                        let isFirstUsageSelector = false;
                        let firstUsageSelector = null;

                        try {
                            firstUsageSelector = await newPage.$eval(
                                "#used",
                                (text) => text.textContent
                            );
                            isFirstUsageSelector = true;
                        } catch (error) {
                            isFirstUsageSelector = false;
                        }

                        if (isFirstUsageSelector) {
                            dataObj["goodUsage"] = await newPage.$eval(
                                "#used",
                                (text) =>
                                    text &&
                                    text.textContent.replace(/\s+/g, " ")
                            );
                        }
                        //Finding Usage selector End

                        /**
                         * Finding Options selector Begin
                         */
                        let isFirstOptionsSelector = false;
                        let firstOptionsSelector = null;

                        try {
                            firstOptionsSelector = await newPage.$eval(
                                "#option table tr th",
                                (text) => text.textContent
                            );
                            isFirstOptionsSelector = true;
                        } catch (error) {
                            isFirstOptionsSelector = false;
                        }

                        if (isFirstOptionsSelector) {
                            let optinsNames = await newPage.$$eval(
                                "#option table tr th",
                                (el) =>
                                    el.map((el) => {
                                        return el.textContent;
                                    })
                            );

                            let optinsValues = await newPage.$$eval(
                                "#option table tr td",
                                (el) =>
                                    el.map((el) => {
                                        return el.textContent;
                                    })
                            );

                            optinsNames.forEach((el, i) => {
                                el === "Объем" &&
                                    (dataObj["goodCapacity"] = optinsValues[i]);
                                el === "Вес" &&
                                    (dataObj["goodWeight"] = optinsValues[i]);
                                el === "Размер" &&
                                    (dataObj["goodSize"] = optinsValues[i]);
                                el === "Диаметр" &&
                                    (dataObj["goodDiameter"] = optinsValues[i]);
                                el === "Материал" &&
                                    (dataObj["goodMaterial"] = optinsValues[i]);
                                el === "Жесткость" &&
                                    (dataObj["goodHardness"] = optinsValues[i]);
                                el === "Метод" &&
                                    (dataObj["goodMethod"] = optinsValues[i]);
                                el === "Назначение" &&
                                    (dataObj["goodUse"] = optinsValues[i]);
                                el === "Серия" &&
                                    (dataObj["goodSeries"] = optinsValues[i]);
                                el === "Производство" &&
                                    (dataObj["goodCountry"] = optinsValues[i]);
                            });
                        }
                        //Finding Options selector End

                        await newPage.close();
                        // console.log(dataObj);
                        resolve(dataObj);
                    });

                for (let link in urls) {
                    id += 1;
                    let currentPageData = await pagePromise(urls[link], id);
                    // console.log('[currentPageData]', currentPageData);
                    scrapedData.push(currentPageData);
                }

                // await page.close();
            } else {
                return {
                    message_en:
                        "There are no available goods. Please, try select another category or subcategory.",
                };
            }

            let isNextPages = false;
            let nextPageUrl = "";

            try {
                nextPageUrl = await page.$eval(
                    ".pagination .active + li > a",
                    (a) => a.href
                );
                isNextPages = true;
            } catch (error) {
                isNextPages = false;
            }

            if (isNextPages) {
                await page.close();
                let newPage = await browser.newPage();
                await newPage.goto(nextPageUrl);
                return scrapeCurrentPage(newPage);
            }

            return scrapedData;
        };

        data = await scrapeCurrentPage(page);
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }

    return data;
};

module.exports = {
    getGoodsData,
};
