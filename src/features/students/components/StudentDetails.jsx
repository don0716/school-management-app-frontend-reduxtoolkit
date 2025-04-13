import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { fetchStudents, deleteStudentAsync } from "../studentsSlice"


const StudentDetails = () => {
    const dispatch = useDispatch()
    const studentId = useParams().studentId

    const {students, status} = useSelector(state => state.students)
    console.log("StudentsData:: ", students, status)

    const student = students.find(stud => stud._id === studentId)
    // console.log("StudentId :: ", studentId)
    // console.log("StudentDetailsStudent:: ", student)

    useEffect(() => {
       dispatch(fetchStudents())
    }, [])

    const handleDelete = (studentId) => {
        dispatch(deleteStudentAsync(studentId))
    }

    return (
        <div>
            {status === "deleting" ? "Deleting..." :  "" }

            {
                status === "deleted" ? "Successfully Deleted Student" : (
                    <div className="row my-2">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                        <h2>Student Detail</h2>
                        <p>Name: {student?.name} </p>
                        <p>Age: {student?.age}</p>
                        <p>Grade: {student?.grade}</p>
                        <p>Gender: {student?.gender}</p>
                        <p>Attendance: {student?.attendance  } </p>
                        <p>Marks: {student?.marks}  </p>

                        <Link to={`/editstudent/${studentId}`} state={{student}}  ><button className="btn btn-warning ">Edit Details</button></Link>

                        <button className="btn btn-danger mx-2" onClick={() => handleDelete(studentId)} >Delete</button>
                        </div>
                    </div>
                </div>
            </div>
                )
            }

        </div>
    )
}

export default StudentDetails