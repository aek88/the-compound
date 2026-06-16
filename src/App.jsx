import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import CucinaEdit from './pages/CucinaEdit'
import GhostDinnersKitchen from './pages/GhostDinnersKitchen'
import ServeoOffices from './pages/ServeoOffices'
import AutomotiveVault from './pages/AutomotiveVault'
import CafeCoworking from './pages/CafeCoworking'

export default function App() {
  return (
    <div className="font-body bg-compound-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spaces/cucina-edit" element={<CucinaEdit />} />
          <Route path="/spaces/ghost-dinners" element={<GhostDinnersKitchen />} />
          <Route path="/spaces/serveo-offices" element={<ServeoOffices />} />
          <Route path="/spaces/automotive-vault" element={<AutomotiveVault />} />
          <Route path="/spaces/cafe-coworking" element={<CafeCoworking />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
