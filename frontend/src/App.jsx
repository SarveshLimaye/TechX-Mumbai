import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";
import Events from "./pages/Events/Events";
import AddEvent from "./pages/AddEvent/AddEvent";
import ApplyVolunteer from "./pages/ApplyVolunteer/ApplyVolunteer";
import Custom404 from "./pages/Custom404/Custom404";
import Navbar from "./components/Navbar/Navbar";
import EventDetails from "./pages/EventDetails/EventDetails";
import CFPDetails from "./pages/CFPDetails/CFPDetails";
import CFPForm from "./components/CFPForm/CFPForm";
import SuccessPage from "./pages/SuccessPage/SuccessPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/explore" element={<Events />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/apply-volunteer" element={<ApplyVolunteer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore/:id" element={<EventDetails />} />
          <Route path="/explore/:id/cfp" element={<CFPDetails />} />
          <Route path="/cfp/apply" element={<CFPForm />}></Route>
          <Route path="/success/:id" element={<SuccessPage />} />
          <Route path="*" element={<Custom404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
