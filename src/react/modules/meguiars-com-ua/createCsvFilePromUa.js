export const createCsvFileMeguiarsProm = data => {
    const records = [];
    records.push([
        'Код_товара',
        'Название_позиции',
        'Название_позиции_укр',
        'Описание',
        'Описание_укр',
        'Цена',
        'Валюта',
        'Единица_измерения',
        'Ссылка_изображения',
        'Наличие',
        'Производитель',
        'Идентификатор_товара',
        'Размер_Значение_характеристики',
        'Диаметр_Значение_характеристики',
        'Применение_Значение_характеристики',
        'Материал_Значение_характеристики',
        'Жесткость_Значение_характеристики',
        'Метод_Значение_характеристики',
        'Серия_Значение_характеристики',
        'Страна_Значение_характеристики',
    ]);

    data.forEach(
        ({
            goodCode,
            goodTitle,
            goodDescription,
            goodPrice,
            goodWeight,
            goodCapacity,
            goodImgUrl,
            goodImgUrl2,
            goodStatus,
            goodBrand,
            goodSize,
            goodDiameter,
            goodUsage,
            goodMaterial,
            goodHardness,
            goodMethod,
            goodSeries,
            goodCountry,
        }) => {
            const goodArr = [];
            // 1. Code length for prom.ua = max 25 char
            goodCode ? goodArr.push(String(goodCode).slice(0, 24)) : goodArr.push(String(''));

            // 2. !IS REQUIRED! Title length for prom.ua = max 100 char
            goodTitle ? goodArr.push(String(goodTitle).slice(0, 99)) : goodArr.push(String(''));

            // 3. !IS REQUIRED! Title_UA version length for prom.ua = max 100 char
            goodTitle ? goodArr.push(String(goodTitle).slice(0, 99)) : goodArr.push(String(''));

            // 4. !IS REQUIRED! Description length for prom.ua = max 12160 char
            goodDescription
                ? goodArr.push(String(goodDescription.replace(/;/g, '.').slice(0, 12159)))
                : goodArr.push(String(''));

            // 5. !IS REQUIRED! Description_UA version length for prom.ua = max 12160 char
            goodDescription
                ? goodArr.push(String(goodDescription.replace(/;/g, '.').slice(0, 12159)))
                : goodArr.push(String(''));

            // 6. Price = number
            goodPrice ? goodArr.push(String(goodPrice)) : goodArr.push(String(''));

            // 7. Currency = UAH | USD | EUR | CHF | RUB | GBP | JPY | PLZ | другая | BYN | KZT | MDL | р | руб | дол | $ | грн
            goodArr.push(String('грн'));

            // 8. Unit = 2г | 5г | 10 г | 50 г | 100г | 10см | шт. | 10 шт. | 20 шт. | 50 шт. | 100 шт. | ампула | баллон | банка etc.
            goodWeight
                ? goodArr.push(String(goodWeight).replace(/\d/g, ''))
                : goodCapacity
                ? goodArr.push(String(goodCapacity).replace(/\d/g, ''))
                : goodArr.push(String('шт.'));

            // 9. Img URL. If good item has a few img URLs it must be pushed with commas and space
            if (goodImgUrl && goodImgUrl2) {
                goodArr.push(String(goodImgUrl + ', ' + goodImgUrl2.join(', ')));
            } else if (goodImgUrl) {
                goodArr.push(String(goodImgUrl));
            } else {
                goodArr.push(String(''));
            }

            // 10. Product availability "+" — есть в наличии, "!" — гарантия наличия (для сертифицированных компаний), "-" — нет в наличии, "&" — ожидается, "@" — услуга, цифра, например, "9" — кол-во дней на доставку, если товар под заказ, Важно! При пустом поле статус вашего товара станет «Нет в наличии».
            goodStatus === 'В наличии ' ? goodArr.push('+') : goodArr.push('-');

            // 11. Vendor, string max. length for prom.ua = 255 char
            goodBrand ? goodArr.push(String(goodBrand).slice(0, 254)) : goodArr.push(String(''));

            // 12. !IS REQUIRED! Product ID = ID of product on prom.ua in your store
            goodCode ? goodArr.push(String(goodCode).slice(0, 24)) : goodArr.push(String(''));

            // First characteristic
            goodSize ? goodArr.push(String(goodSize)) : goodArr.push(String(''));
            
            // Second characteristic
            goodDiameter ? goodArr.push(String(goodDiameter)) : goodArr.push(String(''));
            
            // Third characteristic
            goodUsage ? goodArr.push(String(goodUsage)) : goodArr.push(String(''));
            
            // Fourth characteristic
            goodMaterial ? goodArr.push(String(goodMaterial)) : goodArr.push(String(''));
            
            // Fifth characteristic
            goodHardness ? goodArr.push(String(goodHardness)) : goodArr.push(String(''));

            // Sixth characteristic
            goodMethod ? goodArr.push(String(goodMethod)) : goodArr.push(String(''));
            
            // Seventh characteristic
            goodSeries ? goodArr.push(String(goodSeries)) : goodArr.push(String(''));
            
            // Eighth characteristic
            goodCountry ? goodArr.push(String(goodCountry)) : goodArr.push(String(''));

            records.push(goodArr);
        }
    );

    let csvString = records.map(e => e.join(';')).join('\n');

    return csvString;
};
