import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="max-w-5xl mx-auto p-8 text-center">
      <div className="flex justify-center gap-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="h-24 p-6 transition-all hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="h-24 p-6 transition-all hover:drop-shadow-[0_0_2em_#61dafbaa] animate-spin-slow" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold my-4">Vite + React</h1>
      <div className="p-8">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 rounded-lg border border-transparent bg-gray-800 text-white cursor-pointer transition-colors hover:border-indigo-500"
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code className="bg-gray-700 px-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
