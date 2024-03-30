import { useCallback, useState } from 'react'
import Logo from './logo.svg'
import './App.css'

/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [count, setCount] = useState<number>(0)
  const inc = useCallback(() => {
    setCount(num => num + 1)
  }, [])
  const dec = useCallback(() => {
    setCount(num => num - 1)
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <Logo className="app-logo" title="logo" />
        <div className="flex flex-row items-center justify-center">
          <button className="p-4 text-6xl text-white" onClick={dec}>
            -
          </button>
          <div className="p-4 text-6xl text-white">{count}</div>
          <button className="p-4 text-6xl text-white" onClick={inc}>
            +
          </button>
        </div>
      </header>
    </div>
  )
}

export default App
