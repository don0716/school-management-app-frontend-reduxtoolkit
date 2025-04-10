import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchStudents, updateStudentAsync, deleteStudentAsync } from "../studentsSlice"


const StudentDetails = () => {
    const dispatch = useDispatch()
    const studentId = useParams().studentId

    const studentsData = useSelector(state => state.students.students)

    const student = studentsData.find(stud => stud._id === studentId)
    console.log("StudentDetailsStudent:: ", student)

    useEffect(() => {
       dispatch(fetchStudents())
    }, [])

    const handleDelete = (studentId) => {
        dispatch(deleteStudentAsync(studentId))

    }

    return (
        <div>

            <h2>Student Detail</h2>
            <p>Name: {student?.name} </p>
            <p>Age: {student?.age}</p>
            <p>Grade: {student?.grade}</p>
            <p>Gender: {student?.gender}</p>
            <p>Attendance: {student?.attendance  } </p>
            <p>Marks: {student?.marks}  </p>

            <Link to={`/studentedit/${studentId}`} state={{student}}  ><button className="btn btn-warning ">Edit Details</button></Link>

            <button className="btn btn-danger mx-2" onClick={() => handleDelete(studentId)} >Delete</button>

        </div>
    )
}

export default StudentDetails