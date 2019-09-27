'use strict';
const path = require('path');
const {app, BrowserWindow, Menu} = require('electron');
/// const {autoUpdater} = require('electron-updater');
const {is} = require('electron-util');
const unhandled = require('electron-unhandled');
const debug = require('electron-debug');
const contextMenu = require('electron-context-menu');
const windowStateKeeper = require('electron-window-state');
const config = require('./config');
const menu = require('./menu');
const hbs = require('electron-handlebars');

unhandled();
// debug();
contextMenu();

// Note: Must match `build.appId` in package.json
app.setAppUserModelId('com.company.AppName');

// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
// if (!is.development) {
// 	const FOUR_HOURS = 1000 * 60 * 60 * 4;
// 	setInterval(() => {
// 		autoUpdater.checkForUpdates();
// 	}, FOUR_HOURS);
//
// 	autoUpdater.checkForUpdates();
// }

// Prevent window from being garbage collected
let mainWindow;

const createMainWindow = async () => {
	let winState = windowStateKeeper({
		defaultWidth: 1200,
		defaultWidth: 600
	})
	const win = new BrowserWindow({
		// title: 'MyApp Name',
		show: false,
		width: winState.width,
		height: winState.height,
		x:winState.x,
		y:winState.y,
		frame: true,
		minWidth: 400,
		minHeight: 200
		// webPreferences: {
		// 	nodeIntegration: true
		// }
	});

	winState.manage(win);

	win.on('ready-to-show', () => {
		win.show();
	});

	win.on('closed', () => {
		// Dereference the window
		// For multiple windows store them in an array
		mainWindow = undefined;
	});

	await win.loadFile(path.join(__dirname, 'index.html'));

	return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('second-instance', () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		mainWindow.show();
	}
});

app.on('window-all-closed', () => {
	// if (!is.macos) {
		app.quit();
	// }
});

app.on('activate', async () => {
	if (!mainWindow) {
		mainWindow = await createMainWindow();
	}
});

app.setName('TNSalaryApp');

(async () => {
	await app.whenReady();
	Menu.setApplicationMenu(menu);
	mainWindow = await createMainWindow();

	// const favoriteAnimal = config.get('favoriteAnimal');
	// mainWindow.webContents.executeJavaScript(`document.querySelector('header p').textContent = 'Your favorite animal is ${favoriteAnimal}'`);
})();