import { startTransition, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { deleteTeacherAsync, fetchTeachers } from "../teachersSlice"
import { useDispatch, useSelector } from "react-redux"


const TeacherDetails = () => {
    const dispatch = useDispatch()
    const {teacherId} = useParams()
    console.log("TeacherId" , teacherId)

    const {teachers, status} = useSelector(state => state.teachers)
    console.log("teachers::", teachers)

    const teacherData = teachers?.find(teacher => teacher._id === teacherId)
    console.log("teacherData:: " ,teacherData)

    
    useEffect(() => {
        dispatch(fetchTeachers())
    }, [])


    const handleDelete = (teacherId) => {
        dispatch(deleteTeacherAsync(teacherId))
    }


    return (
        <div>

            <h1>Teacher Details</h1>

            <div>
                {status === "deleting" ? "Deleting..." : status === "error" ? "There was an error" : ""}
            </div>

            {status === "deleted" ? "Successfully Deleted Teacher" : (
                <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <p><strong>Name: </strong> {teacherData?.name} </p>
                            <p><strong>Age: </strong> {teacherData?.age} </p>
                            <p><strong>Attendance: </strong> {teacherData?.attendance} </p>
                            <p><strong>Experience: </strong> {teacherData?.experience} </p>
                            <p><strong>Gender: </strong> {teacherData?.gender} </p>
                            <Link to={`/editteacher/${teacherId}`} state={{teacherData}} ><button className="btn btn-warning">Edit Details</button></Link> 
                            <button onClick={() => handleDelete(teacherData?._id)} className="btn btn-danger mx-2">Delete</button>
                        </div>

                    </div>
                </div>
            </div>
            )}
            
        </div>
    )
}

export default TeacherDetails