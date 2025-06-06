import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router'
import { UserProvider } from './context/UserContext';
import TheCollection from './TheCollection';
import VariantForm from './VariantForm';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="container py-5"><h1>Loading...</h1></div>}>
        <UserProvider>
          <Routes>
            <Route path="/" element={<TheCollection />} />
            <Route path="/add" element={<VariantForm card={{}} />} />
            <Route path="/edit/:id" element={<VariantForm card={{}} />} />
          </Routes>
        </UserProvider>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
