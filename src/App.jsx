import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import StudentView from "./features/students/StudentView"
import StudentForm from "./features/students/components/StudentForm"
import StudentDetails from "./features/students/components/StudentDetails"
import Header from "./components/Header"
import ClassView from "./features/students/components/ClassView"
import SchoolView from "./features/students/components/SchoolView"
import TeacherList from "./features/teachers/components/TeachersList"
import TeacherForm from "./features/teachers/components/TeacherForm"
import TeacherDetails from "./features/teachers/components/TeacherDetails"


function App() {

  

  return (
    <div>
    
      <BrowserRouter>
       <Header />

        <div className="container">
        <Routes>
          <Route path="/" element={<StudentView />} />
          <Route path="/addstudent" element={<StudentForm isAddStudent={true} />} />
          <Route path="/editstudent/:studentId" element={<StudentForm isAddStudent={false} />} />
          <Route path="/studentdetails/:studentId" element={<StudentDetails />} />
          <Route path="/classes" element={<ClassView />} />

          {/* SchoolView */}
          <Route path="/school" element={<SchoolView />} />

          {/* Teacher Routes */}
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teacherdetails/:teacherId" element={<TeacherDetails />} />
          <Route path="/addteacher" element={<TeacherForm isAddTeacher= {true} />} />
          <Route path="/editteacher/:teacherId" element={<TeacherForm isAddTeacher={false} />} />
          
          
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

