import { useEffect } from 'react'
import PWABadge from './PWABadge.jsx'
import './App.css'
import { registerSW } from "virtual:pwa-register";
import Header from './components/Header.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Add from './pages/Add.jsx';
import Update from './pages/Update.jsx';
function App() {
  useEffect(() => {
    const updateSW = registerSW({
      onOfflineReady() {
        alert("Ứng dụng đã sẵn sàng để sử dụng offline!");
      },
    });
    console.log(updateSW);
    
  }, []);

  useEffect(() => {
    const handleOffline = () => {
      alert("Bạn đang offline! Hãy kiểm tra kết nối mạng.");
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);


  
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
      <PWABadge />
    </>
  )
}

export default App
