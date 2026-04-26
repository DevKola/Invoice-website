import { Navigate, Route, Routes } from 'react-router';
import Home from './pages/Home.tsx';
import InvoiceByIdPage from './pages/[id].tsx';
import Layout from './pages/Layout.tsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/invoices/:invoiceId" element={<InvoiceByIdPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

