const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const WebSocket = require("ws");
const puppeteer = require("puppeteer-core");

const path = require("path");

const goodsGetterFromChemicalguysUa = require("./modules/chemicalguysUa/getChemicalguysData");
const goodsGetterFromMeguiars = require("./modules/meguiarsComUa/getMeguiarsData");

const server = new WebSocket.Server({ port: 5050 });
const win = null;

const createWindow = (win) => {
  win = new BrowserWindow({
    width: 1124,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../index.html")}`
  );

  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow(win);

  server.on("connection", (ws) => {
    ws.on("message", (message) => {
      const request = JSON.parse(message);
      const { event, categoryName, categoryUrl, selectedSite } = request;

      if (event === "getGoodsRequest") {
        let browser;
        let exPath =
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

        const startBrowser = async () => {
          let browserInstance;

          try {
            console.log("Opening the browser......");
            browserInstance = await puppeteer.launch({
              executablePath: exPath,
              timeout: 60000,
              headless: true,
              args: ["--disable-setuid-sandbox"],
              ignoreHTTPSErrors: true,
            });
          } catch (error) {
            console.log(`Here is some error: ${error}`);
          }

          return browserInstance;
        };

        const getGoods = async (
          browser,
          categoryName,
          categoryUrl,
          selectedSite
        ) => {
          browser = await startBrowser();
          let data = null;

          selectedSite === "Chemicalguys.ua" &&
            (data = await goodsGetterFromChemicalguysUa.getGoodsData(
              browser,
              categoryName,
              categoryUrl
            ));
          selectedSite === "Meguiars.com.ua" &&
            (data = await goodsGetterFromMeguiars.getGoodsData(
              browser,
              categoryName,
              categoryUrl
            ));

          // console.log('[data]', data);

          server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(data));
            }
          });

          await browser.close();
        };

        getGoods(browser, categoryName, categoryUrl, selectedSite);
      }
    });
  });

  app.on("window-all-closed", () => {
    process.platform !== "darwin" && app.quit();
  });

  app.on("activate", () => {
    BrowserWindow.getAllWindows().length === 0 && createWindow(win);
  });
});
