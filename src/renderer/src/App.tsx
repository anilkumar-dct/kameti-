import Versions from './components/Versions'
import UpdateNotification from './components/UpdateNotification'
// Side-effect import: logs and exposes `runCreateUserTest` on window for manual testing
import './components/test'

function App(): React.JSX.Element {
  return (
    <>
      <div className="container">
        <h1>Kameti Management</h1>
        <p>Your clean start begins here.</p>
      </div>
      <Versions />
      <UpdateNotification />
    </>
  )
}

export default App
