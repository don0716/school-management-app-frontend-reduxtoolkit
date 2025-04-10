import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import StudentView from "./features/students/StudentView"
import StudentForm from "./features/students/components/StudentForm"
import StudentDetails from "./features/students/components/StudentDetails"
import Header from "./components/Header"


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

          <Route path="/studentdetail/:studentId" element={<StudentDetails />} />
          
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

