import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import StudentView from "./features/students/StudentView"
import StudentForm from "./features/students/components/StudentForm"
import StudentDetails from "./features/students/components/StudentDetails"
import Header from "./components/Header"
import ClassView from "./features/students/components/ClassView"
import SchoolView from "./features/students/components/SchoolView"


function App() {

  

  return (
    <div>
    
      <BrowserRouter>
       <Header />

        <div className="container">
        <Routes>
          <Route path="/" element={<StudentView />} />
          <Route path="/addstudent" element={<StudentForm isAddStudent={true} />} />
          <Route path="/studentedit/:studentId" element={<StudentForm isAddStudent={false} />} />
          <Route path="/classes" element={<ClassView />} />
          <Route path="school" element={<SchoolView />} />
          

          <Route path="/studentdetail/:studentId" element={<StudentDetails />} />
          
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

