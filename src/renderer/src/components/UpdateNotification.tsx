import { useEffect, useState } from 'react'

const UpdateNotification = () => {
  const [updateMessage, setUpdateMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const [downloaded, setDownloaded] = useState(false)

  useEffect(() => {
    window.electron.ipcRenderer.on('update-message', (_event, message) => {
      setUpdateMessage(message)
    })

    window.electron.ipcRenderer.on('download-progress', (_event, percent) => {
      setProgress(percent)
    })

    window.electron.ipcRenderer.on('update-downloaded', () => {
      setDownloaded(true)
      setUpdateMessage('Update downloaded. Restarting to install...')
    })

    return () => {
      window.electron.ipcRenderer.removeAllListeners('update-message')
      window.electron.ipcRenderer.removeAllListeners('download-progress')
      window.electron.ipcRenderer.removeAllListeners('update-downloaded')
    }
  }, [])

  const installUpdate = () => {
    window.electron.ipcRenderer.send('install-update')
  }

  if (!updateMessage && !downloaded) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#333',
      color: '#fff',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>App Update</h4>
      <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{updateMessage}</p>
      
      {progress > 0 && progress < 100 && (
        <div style={{ width: '100%', height: '8px', backgroundColor: '#555', borderRadius: '4px', marginBottom: '10px' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#007bff', borderRadius: '4px' }}></div>
        </div>
      )}

      {downloaded && (
        <button 
          onClick={installUpdate}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Restart & Install
        </button>
      )}
    </div>
  )
}

export default UpdateNotification
