export const createXmlFileKochChemieProm = (data, categoryName) => {
    const builder = require('xmlbuilder');
    let xml = builder.create('shop');

    for (let i = 0; i < data.length; i++) {
        let good = data[i];
        let {
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
        } = good;

        xml
            .ele('catalog')
            .ele('category', {id: '1'})
            .txt(`${categoryName}`)
            .up().up()
            .ele('items')
            .ele('item', {
                id: `${goodCode.slice(0, 24) || 'Not defined'}`
            })
            .ele('name')
            .txt(`${goodTitle.slice(0, 99)}`) // max length 100 char
            .up()
            .ele('categoryId')
            .txt('1') // !IS REQUIRED!
            .up()
            .ele('priceuah')
            .txt(`${goodPrice}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl ? goodImgUrl : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[0] !== undefined ? goodImgUrl2[0] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[1] !== undefined ? goodImgUrl2[1] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[2] !== undefined ? goodImgUrl2[2] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[3] !== undefined ? goodImgUrl2[3] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[4] !== undefined ? goodImgUrl2[4] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[5] !== undefined ? goodImgUrl2[5] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[6] !== undefined ? goodImgUrl2[6] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[7] !== undefined ? goodImgUrl2[7] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[8] !== undefined ? goodImgUrl2[8] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[9] !== undefined ? goodImgUrl2[9] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[10] !== undefined ? goodImgUrl2[10] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[11] !== undefined ? goodImgUrl2[11] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[12] !== undefined ? goodImgUrl2[12] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[13] !== undefined ? goodImgUrl2[13] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[14] !== undefined ? goodImgUrl2[14] : ''}`)
            .up()
            .ele('image')
            .txt(`${goodImgUrl2 && goodImgUrl2.length && goodImgUrl2[15] !== undefined ? goodImgUrl2[15] : ''}`)
            .up()
            .ele('vendor')
            .txt(`${goodBrand ? goodBrand : ''}`)
            .up()
            .ele('param', {name: 'Действие'})
            .txt(`${goodAction ? goodAction : ''}`)
            .up()
            .ele('param', {name: 'Свойства'})
            .txt(`${goodProperties ? goodProperties : ''}`)
            .up()
            .ele('param', {name: 'Норма pH'})
            .txt(`${goodPHnorm ? goodPHnorm : ''}`)
            .up()
            .ele('param', {name: 'Дополнительная информация'})
            .txt(`${goodAdditionalInfo ? goodAdditionalInfo : ''}`)
            .up()
            .ele('param', {name: 'Гарантия'})
            .txt(`${goodGuarantee ? goodGuarantee : ''}`)
            .up()
            .ele('param', {name: 'Вес'})
            .txt(`${goodWeight ? goodWeight : ''}`)
            .up()
            .ele('param', {name: 'Емкость'})
            .txt(`${goodCapacity ? goodCapacity : ''}`)
            .up()
            .ele('description')
            .txt(`${goodDescription ? goodDescription : ''}`)
            .up()
            .ele('available')
            .txt(`${goodStatus === 'В наличии ' ? 'true' : 'false'}`)
            .up()
            .ele('param', {name: 'Тип питания'})
            .txt(`${goodPowerType ? goodPowerType : ''}`)
            .up()
            .ele('param', {name: 'Тип вращения'})
            .txt(`${goodRotationType ? goodRotationType : ''}`)
            .up()
            .ele('param', {name: 'Макс диаметр полировального элемента'})
            .txt(`${goodMaxDiameter ? goodMaxDiameter : ''}`)
            .up()
            .ele('param', {name: 'Макс диаметр опорного диска'})
            .txt(`${goodMaxDiameter2 ? goodMaxDiameter2 : ''}`)
            .up()
            .ele('param', {name: 'Использование'})
            .txt(`${goodUse ? goodUse : ''}`)
            .up()
            .ele('param', {name: 'Частота вращения на холостом ходу'})
            .txt(`${goodIdlingSpeed ? goodIdlingSpeed : ''}`)
            .up()
            .ele('param', {name: 'Потребляемая мощность'})
            .txt(`${goodPowerConsumption ? goodPowerConsumption : ''}`)
            .up()
            .ele('param', {name: 'Отдаваемая мощность'})
            .txt(`${goodPowerOutput ? goodPowerOutput : ''}`)
            .up()
            .ele('param', {name: 'Крепление инструмента'})
            .txt(`${goodToolHolder ? goodToolHolder : ''}`)
            .up()
            .ele('param', {name: 'Размеры_(ДxВ)'})
            .txt(`${goodDimensions ? goodDimensions : ''}`)
            .up()
            .ele('param', {name: 'Длина кабеля'})
            .txt(`${goodCableLength ? goodCableLength : ''}`)
            .up()
            .ele('param', {name: 'Вес без аккумулятора'})
            .txt(`${goodWeightWithoutBattery ? goodWeightWithoutBattery : ''}`)
            .up()
            .ele('param', {name: 'Размеры_(ДxШxВ)'})
            .txt(`${goodDimensions2 ? goodDimensions2 : ''}`)
            .up()
            .ele('param', {name: 'Емкость аккумулятора'})
            .txt(`${goodBatteryCapacity ? goodBatteryCapacity : ''}`)
            .up()
            .ele('param', {name: 'Напряжение аккумулятора'})
            .txt(`${goodBatteryVoltage ? goodBatteryVoltage : ''}`)
            .up()
            .ele('param', {name: 'Число ходов на холостом ходу'})
            .txt(`${goodIdlingSpeed2 ? goodIdlingSpeed2 : ''}`)
            .up()
            .ele('param', {name: 'Ход'})
            .txt(`${goodStep ? goodStep : ''}`)
    }

    let xmlString = xml.toString({ pretty: true });

    return xmlString;
};
