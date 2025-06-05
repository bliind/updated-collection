import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router'
import TheCollection from './TheCollection';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="container py-5"><h1>Loading...</h1></div>}>
      <Routes>
        <Route path="/" element={<TheCollection />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
