import Container from "./page/container/Container"
import Reset_password from "./components/reset_password/Reset_password"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/forgot-password" element={<Reset_password />} />
      </Routes>
    </Router>
  )
}

export default App