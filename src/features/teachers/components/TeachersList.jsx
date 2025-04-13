import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { fetchTeachers } from "../teachersSlice"

const TeacherList = () => {
    const dispatch = useDispatch()
    const {teachers, status, error} = useSelector(state => state.teachers )
    console.log("teachers:: ", teachers)

    useEffect(() => {
        dispatch(fetchTeachers())
    }, [])


    return (
        <div>

            <h1>Teacher View</h1>

            <div className="my-2 py-2" >
                <Link to={'/addteacher'} ><button className="btn btn-warning">Add Teacher</button></Link>
            </div>

            <h2>Teachers List</h2>

            <div className="row">
            <div className="col-md-6">
               {error ? "There was an error" : (
                 status === "loading" ? "Loading..." : (
                    <ul className="list-group">
                    {
                        
                        teachers.map(teacher => (
                            <li key={teacher._id} className="list-group-item">
                                <Link to={`/teacherdetails/${teacher._id}`}>{teacher.name} | {teacher.age} | {teacher.gender}</Link>
                            </li>
                        ))
                    }
                </ul>
                ) 
               ) }
            </div>
            </div>

        </div>
    )
}

export default TeacherList