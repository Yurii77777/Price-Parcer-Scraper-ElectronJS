const getGoodsData = async (browser, categoryName, catogoryUrl) => {
    let data = null;

    try {
        let page = await browser.newPage();

        console.log(`Navigating to ${catogoryUrl}...`);
        await page.goto(catogoryUrl);

        const scrapedData = [];
        let id = 0;

        const scrapeCurrentPage = async (page) => {
            await page.waitForSelector("main");

            let isGoodsExist = false;
            let goods = null;

            try {
                goods = await page.$eval(
                    "#product-list .product-list .product .image_wrap > a",
                    (a) => a.href
                );
                isGoodsExist = true;
            } catch (error) {
                isGoodsExist = false;
            }

            if (isGoodsExist) {
                let urls = await page.$$eval(
                    "#product-list .product-list .product",
                    (links) => {
                        links = links.map(
                            (link) =>
                                link.querySelector(".in > .image_wrap > a").href
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
                                ".purchase .add2cart .prices > span",
                                (text) => text.textContent
                            );
                            isFirstPriceSelector = true;
                        } catch (error) {
                            isFirstPriceSelector = false;
                        }

                        if (isFirstPriceSelector) {
                            dataObj["goodPrice"] = await newPage.$eval(
                                ".purchase .add2cart .prices > span",
                                (text) => text.textContent.replace(/(\D)/gm, "")
                            );
                        }
                        // Finding Price selector End

                        dataObj["goodSeller"] = "Koch Chemie";

                        /**
                         * Finding Image selector Begin
                         */
                        let isFirstImgSelector = false;
                        let firstImgSelector = null;

                        try {
                            firstImgSelector = await newPage.$eval(
                                ".image > a",
                                (a) => a.href
                            );
                            isFirstImgSelector = true;
                        } catch (error) {
                            isFirstImgSelector = false;
                        }

                        if (isFirstImgSelector) {
                            dataObj["goodImgUrl"] = await newPage.$eval(
                                ".image > a",
                                (a) => a.href
                            );
                        }

                        let isAdditionalImgSelector = false;
                        let additionalImgSelector = null;

                        try {
                            additionalImgSelector = await newPage.$eval(
                                ".image.slick-slide.slick-active > a",
                                (a) => a.href
                            );
                            isAdditionalImgSelector = true;
                        } catch (error) {
                            isAdditionalImgSelector = false;
                        }

                        if (isAdditionalImgSelector) {
                            let additionalImgUrls = await newPage.$$eval(
                                ".image.slick-slide.slick-active > a",
                                (el) =>
                                    el.map((el) => {
                                        return el.href;
                                    })
                            );
                            // console.log(additionalImgUrls);

                            dataObj["goodImgUrl2"] = additionalImgUrls;
                        }
                        //Finding Image selector End

                        /**
                         * Finding Options selector Begin
                         */
                        let isOptionsSelector = false;
                        let optionsSelector = null;

                        try {
                            optionsSelector = await newPage.$eval(
                                "#product-features tbody tr td",
                                (text) => text.textContent
                            );
                            isOptionsSelector = true;
                        } catch (error) {
                            isOptionsSelector = false;
                        }

                        if (isOptionsSelector) {
                            let options = await newPage.$$eval(
                                "#product-features tbody tr td",
                                (el) =>
                                    el.map((el) => {
                                        return el.textContent.trim();
                                    })
                            );

                            options.forEach((el, i) => {
                                el === "??????????????????????????" &&
                                    (dataObj["goodBrand"] = options[i + 1]);
                                el === "??????????" &&
                                    (dataObj["goodCapacity"] = options[i + 1]);
                                el === "??????????????????????????" &&
                                    (dataObj["goodUse"] = options[i + 1]);
                                el === "??????" &&
                                    (dataObj["goodWeight"] = options[i + 1]);
                                el === "????????????????" &&
                                    (dataObj["goodAction"] = options[i + 1]);
                                el === "????????????????" &&
                                    (dataObj["goodProperties"] =
                                        options[i + 1]);
                                el === "?????????? pH" &&
                                    (dataObj["goodPHnorm"] = options[i + 1]);
                                el === "???????????????????????????? ????????????????????" &&
                                    (dataObj["goodAdditionalInfo"] =
                                        options[i + 1]);
                                el === "????????????????" &&
                                    (dataObj["goodGuarantee"] = options[i + 1]);
                                el === "?????? ??????????????" &&
                                    (dataObj["goodPowerType"] = options[i + 1]);
                                el === "?????? ????????????????" &&
                                    (dataObj["goodRotationType"] =
                                        options[i + 1]);
                                el ===
                                    "????????. ?????????????? ???????????????????????????? ????????????????" &&
                                    (dataObj["goodMaxDiameter"] =
                                        options[i + 1]);
                                el === "????????. ?????????????? ???????????????? ??????????" &&
                                    (dataObj["goodMaxDiameter2"] =
                                        options[i + 1]);
                                (el ===
                                    "?????????????? ???????????????? ???? ???????????????? ???????? (???????????????? ?? ????????????)" ||
                                    el ===
                                        "?????????????? ???????????????? ???? ???????????????? ????????") &&
                                    (dataObj["goodIdlingSpeed"] =
                                        options[i + 1]);
                                el === "???????????????????????? ????????????????" &&
                                    (dataObj["goodPowerConsumption"] =
                                        options[i + 1]);
                                el === "???????????????????? ????????????????" &&
                                    (dataObj["goodPowerOutput"] =
                                        options[i + 1]);
                                el === "?????????????????? ??????????????????????" &&
                                    (dataObj["goodToolHolder"] =
                                        options[i + 1]);
                                el === "?????????????? (?? x ??)" &&
                                    (dataObj["goodDimensions"] =
                                        options[i + 1]);
                                el === "?????????? ????????????" &&
                                    (dataObj["goodCableLength"] =
                                        options[i + 1]);
                                el === "?????? ?????? ????????????????????????" &&
                                    (dataObj["goodWeightWithoutBattery"] =
                                        options[i + 1]);
                                el === "?????????????? (?? x ?? x ??)" &&
                                    (dataObj["goodDimensions2"] =
                                        options[i + 1]);
                                el === "?????????????? ????????????????????????" &&
                                    (dataObj["goodBatteryCapacity"] =
                                        options[i + 1]);
                                el === "???????????????????? ????????????????????????" &&
                                    (dataObj["goodBatteryVoltage"] =
                                        options[i + 1]);
                                el === "?????????? ?????????? ???? ???????????????? ????????" &&
                                    (dataObj["goodIdlingSpeed2"] =
                                        options[i + 1]);
                                el === "??????" &&
                                    (dataObj["goodStep"] = options[i + 1]);
                            });

                            // console.log(options);
                        }
                        //Finding Options selector End

                        /**
                         * Finding Code selector Begin
                         */
                        let isFirstCodeSelector = false;
                        let firstCodeSelector = null;

                        try {
                            isFirstCodeSelector = await newPage.$eval(
                                ".artnumber",
                                (text) => text.textContent
                            );
                            isFirstCodeSelector = true;
                        } catch (error) {
                            isFirstCodeSelector = false;
                        }

                        if (isFirstCodeSelector) {
                            dataObj["goodCode"] = await newPage.$eval(
                                ".artnumber",
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
                                ".stock-high",
                                (text) => text.textContent
                            );
                            isFirstStatusSelector = true;
                        } catch (error) {
                            isFirstStatusSelector = false;
                        }

                        if (isFirstStatusSelector) {
                            let goodStatus = await newPage.$eval(
                                ".stock-high",
                                (text) => text.textContent.trim()
                            );

                            goodStatus === '?? ??????????????' && (dataObj["goodStatus"] = '?? ?????????????? ')
                            goodStatus === '?????? ??????????' && (dataObj["goodStatus"] = '?????? ??????????')
                        }

                        let isSecondStatusSelector = false;
                        let secondStatusSelector = null;

                        try {
                            secondStatusSelector = await newPage.$eval(
                                "form > .stocks > .stock-none",
                                (text) => text.textContent
                            );
                            isSecondStatusSelector = true;
                        } catch (error) {
                            isSecondStatusSelector = false;
                        }

                        if (isSecondStatusSelector) {
                            let goodStatus = await newPage.$eval(
                                "form > .stocks > .stock-none",
                                (text) => text.textContent.trim()
                            );

                            goodStatus === '?????? ?? ??????????????' && (dataObj["goodStatus"] = '?????? ?? ??????????????')
                        }
                        //Finding Status selector End

                        /**
                         * Finding Description selector Begin
                         */
                        let isFirstDescriptionSelector = false;
                        let firstDescriptionSelector = null;

                        try {
                            firstDescriptionSelector = await newPage.$eval(
                                "#product-description",
                                (text) => text.textContent
                            );
                            isFirstDescriptionSelector = true;
                        } catch (error) {
                            isFirstDescriptionSelector = false;
                        }

                        if (isFirstDescriptionSelector) {
                            dataObj["goodDescription"] = await newPage.$eval(
                                "#product-description",
                                (text) =>
                                    text &&
                                    text.textContent.replace(/\s+/g, " ")
                            );
                        }
                        //Finding Description selector End

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
