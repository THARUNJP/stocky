import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <div className="flex justify-center gap-6 my-8">
    <a
      href="https://vite.dev"
      target="_blank"
      className="px-4 py-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
    >
      <span className="font-bold text-blue-600">Vite</span>
    </a>
    <a
      href="https://react.dev"
      target="_blank"
      className="px-4 py-2 bg-cyan-100 rounded-lg hover:bg-cyan-200 transition"
    >
      <span className="font-bold text-cyan-600">React</span>
    </a>
  </div>

  <h1 className="text-3xl font-bold text-center mb-6">Vite + React</h1>

  <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md">
    <button
      onClick={() => setCount((count) => count + 1)}
      className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
    >
      count is {count}
    </button>
    <p className="text-gray-600">
      Edit <code className="bg-gray-100 px-1 rounded">src/App.jsx</code> and save to test HMR
    </p>
  </div>

  <p className="text-center text-gray-500 mt-6">
    Click on the Vite and React buttons to learn more
  </p>
</>
  )
}

export default App
