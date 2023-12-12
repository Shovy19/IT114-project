import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login"
import Homepage from "./pages/Homepage"
import Map from "./pages/Map"
import Building from "./pages/Building";
import Colleges from "./pages/Colleges"
import Instructor from "./pages/Instructor";
import Event from "./pages/Event";
import CollegeDetail from './pages/CollegeDetail'
import InstructorDetail from "./pages/InstructorDetail";
import BuildingInfo from "./pages/BuildingInfo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Homepage/Map" element={<Map />} />
          <Route path="/Homepage/Building" element={<Building />} />
          <Route path="/Homepage/Colleges" element={<Colleges />} />
          <Route path="/Homepage/Instructor" element={<Instructor />} />
          <Route path="/Homepage/Event" element={<Event />} />
        
          <Route path="/colleges/:collegeName" element={<CollegeDetail />} />
          <Route path="/instructor/:instructorName" element={<InstructorDetail />} />
          <Route path="/Building/:buildingName" element={<BuildingInfo />} />
          

          
          
         

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
