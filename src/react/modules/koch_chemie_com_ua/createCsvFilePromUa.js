export const createCsvFileKochChemieProm = data => {
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
        'Действие_Значение_характеристики',
        'Свойства_Значение_характеристики',
        'Норма_pH_Значение_характеристики',
        'Дополнительная_информация_Значение_характеристики',
        'Гарантия_Значение_характеристики',
        'Тип_питания_Значение_характеристики',
        'Тип_вращения_Значение_характеристики',
        'Макс_диаметр_полировального_элемента_Значение_характеристики',
        'Макс_диаметр_опорного_диска_Значение_характеристики',
        'Использование_Значение_характеристики',
        'Частота_вращения_на_холостом_ходу_Значение_характеристики',
        'Потребляемая_мощность_Значение_характеристики',
        'Отдаваемая_мощность_Значение_характеристики',
        'Крепление_инструмента_Значение_характеристики',
        'Размеры_(ДxВ)_Значение_характеристики',
        'Длина_кабеля_Значение_характеристики',
        'Вес_без_аккумулятора_Значение_характеристики',
        'Размеры_(ДxШxВ)_Значение_характеристики',
        'Емкость_аккумулятора_Значение_характеристики',
        'Напряжение_аккумулятора_Значение_характеристики',
        'Число_ходов_на_холостом_ходу_Значение_характеристики',
        'Ход_Значение_характеристики',
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
            goodAction,
            goodProperties,
            goodPHnorm,
            goodAdditionalInfo,
            goodGuarantee,
            goodPowerType,
            goodRotationType,
            goodMaxDiameter,
            goodMaxDiameter2,
            goodUse,
            goodIdlingSpeed,
            goodPowerConsumption,
            goodPowerOutput,
            goodToolHolder,
            goodDimensions,
            goodCableLength,
            goodWeightWithoutBattery,
            goodDimensions2,
            goodBatteryCapacity,
            goodBatteryVoltage,
            goodIdlingSpeed2,
            goodStep,
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
            goodAction ? goodArr.push(String(goodAction)) : goodArr.push(String(''));
            
            // Second characteristic
            goodProperties ? goodArr.push(String(goodProperties)) : goodArr.push(String(''));
            
            // Third characteristic
            goodPHnorm ? goodArr.push(String(goodPHnorm)) : goodArr.push(String(''));
            
            // Fourth characteristic
            goodAdditionalInfo ? goodArr.push(String(goodAdditionalInfo)) : goodArr.push(String(''));
            
            // Fifth characteristic
            goodGuarantee ? goodArr.push(String(goodGuarantee)) : goodArr.push(String(''));

            // Sixth characteristic
            goodPowerType ? goodArr.push(String(goodPowerType)) : goodArr.push(String(''));
            
            // Seventh characteristic
            goodRotationType ? goodArr.push(String(goodRotationType)) : goodArr.push(String(''));
            
            // Eighth characteristic
            goodMaxDiameter ? goodArr.push(String(goodMaxDiameter)) : goodArr.push(String(''));

            // Ninth characteristic
            goodMaxDiameter2 ? goodArr.push(String(goodMaxDiameter2)) : goodArr.push(String(''));

            // Tenth characteristic
            goodUse ? goodArr.push(String(goodUse)) : goodArr.push(String(''));

            // Eleventh characteristic
            goodIdlingSpeed ? goodArr.push(String(goodIdlingSpeed)) : goodArr.push(String(''));

            // Twelvth characteristic
            goodPowerConsumption ? goodArr.push(String(goodPowerConsumption)) : goodArr.push(String(''));

            // Thirteenth characteristic
            goodPowerOutput ? goodArr.push(String(goodPowerOutput)) : goodArr.push(String(''));

            // Fourteenth characteristic
            goodToolHolder ? goodArr.push(String(goodToolHolder)) : goodArr.push(String(''));

            // Fifteenth characteristic
            goodDimensions ? goodArr.push(String(goodDimensions)) : goodArr.push(String(''));

            // Sixteenth characteristic
            goodCableLength ? goodArr.push(String(goodCableLength)) : goodArr.push(String(''));

            // Seventeenth characteristic
            goodWeightWithoutBattery ? goodArr.push(String(goodWeightWithoutBattery)) : goodArr.push(String(''));

            // Eighteenth characteristic
            goodDimensions2 ? goodArr.push(String(goodDimensions2)) : goodArr.push(String(''));

            // Nineteenth characteristic
            goodBatteryCapacity ? goodArr.push(String(goodBatteryCapacity)) : goodArr.push(String(''));

            // Twentieth characteristic
            goodBatteryVoltage ? goodArr.push(String(goodBatteryVoltage)) : goodArr.push(String(''));

            // Twentyfirst characteristic
            goodIdlingSpeed2 ? goodArr.push(String(goodIdlingSpeed2)) : goodArr.push(String(''));

            // Twenty second characteristic
            goodStep ? goodArr.push(String(goodStep)) : goodArr.push(String(''));

            records.push(goodArr);
        }
    );

    let csvString = records.map(e => e.join(';')).join('\n');

    return csvString;
};
