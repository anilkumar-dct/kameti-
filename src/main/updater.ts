import { autoUpdater } from 'electron-updater'
import { ipcMain, BrowserWindow } from 'electron'
import log from 'electron-log'

// Configure logging
autoUpdater.logger = log
// @ts-ignore
autoUpdater.logger.transports.file.level = 'info'

export function initUpdater(mainWindow: BrowserWindow): void {
  autoUpdater.checkForUpdatesAndNotify()

  autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.send('update-message', 'Checking for update...')
  })

  autoUpdater.on('update-available', (info) => {
    mainWindow.webContents.send('update-message', `Update available: ${info.version}`)
    mainWindow.webContents.send('update-available', info)
  })

  autoUpdater.on('update-not-available', () => {
    mainWindow.webContents.send('update-message', 'Update not available.')
  })

  autoUpdater.on('error', (err) => {
    mainWindow.webContents.send('update-message', `Error in auto-updater: ${err}`)
  })

  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = 'Download speed: ' + progressObj.bytesPerSecond
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
    log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
    mainWindow.webContents.send('update-message', log_message)
    mainWindow.webContents.send('download-progress', progressObj.percent)
  })

  autoUpdater.on('update-downloaded', (info) => {
    mainWindow.webContents.send('update-message', 'Update downloaded')
    mainWindow.webContents.send('update-downloaded', info)
  })

  ipcMain.on('install-update', () => {
    autoUpdater.quitAndInstall()
  })
}
