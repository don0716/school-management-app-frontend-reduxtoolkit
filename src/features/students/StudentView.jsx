import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStudents } from "./studentsSlice"
import StudentList from "./components/StudentList"
import { Link } from "react-router-dom"


const StudentView = () => {
    const dispatch = useDispatch()
    const {students, error, status} = useSelector((state) => state.students)

    // console.log("students:: ", students)
    // console.log("status:: ", status)
    // console.log("error:: ", error)

    

    useEffect(() => {
        dispatch(fetchStudents())
    }, [])

    return (
        <>
           <h1>Student View</h1>
          
          <div>
            
            <Link  to="/addstudent"><button className="btn btn-warning" >Add Student</button></Link>

          </div>

          <div>
            

            <h2>Student List</h2>

            <StudentList students={students} status={status} error={error} />
        
          </div>
        </>
    )
}
export default StudentView