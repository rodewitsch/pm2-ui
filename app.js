const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/fuse/index.html`),
            protocol: "file:",
            slashes: true,
        })
    );
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.webContents.on('did-fail-load', () => {
        console.log('did-fail-load');
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, `/dist/fuse/index.html`),
            protocol: "file:",
            slashes: true,
        }));
        // REDIRECT TO FIRST WEBPAGE AGAIN
     });

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.on("ready", createWindow);


app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    if (mainWindow === null) createWindow();
});
