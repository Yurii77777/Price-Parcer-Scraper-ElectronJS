# PRICE PARCER [SCRAPER] v 1.0.0 powered by Electron

За базу был взят проект парсера Node + WebSockets + Puppeteer + React (https://github.com/Yurii77777/Price-Parcer-Scraper-_Node_React.git).
Добавлена щепотка соли и Electron JS.
На выходе получаем exe-файл для комфортной работы в среде Windows.

# How To Start

ВАЖНО! Указываем свой (корретный) путь к исполняющему файлу chrome.exe в файле main.js

npm run dev => запускаем со среды разработки в режиме [development].
npm run build => собираем проект.
В папку [build] перемещаем папку [electron] со всем её содержимым.
npm run package => собираем exe-файл для Windows.

The End ;)

p. s.
TODO:// Выбор пути к исполняющему файлу Chrome через диалоговое (модальное) окно.
