import Versions from './components/Versions'
import UpdateNotification from './components/UpdateNotification'
import TodoApp from './components/TodoApp'

function App(): React.JSX.Element {
  return (
    <>
      <div className="container">
        <TodoApp />
      </div>
      <Versions />
      <UpdateNotification />
    </>
  )
}

export default App
