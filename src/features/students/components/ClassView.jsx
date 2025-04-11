import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStudents, setFilter, setSortBy } from "../studentsSlice"

const ClassView = () => {
    const dispatch = useDispatch()

    const {students, filter, sortBy, status, error} = useSelector(state => state.students)
    console.log(status, error)

    const filterByGender = (gender) => {
        return students.filter(stud => stud.gender === gender )
    }

    const filteredStudents = filter !== "All" ? (filter === "Male" ? filterByGender("Male") : filterByGender("Female") ) : students 

    console.log( "FilteredStudents:: " ,filteredStudents)

    useEffect(() => {
        students.length <= 0 && dispatch(fetchStudents()) 
    }, [])

    // sorting will be done only on filteredStudents.
    const sortedArray = [...filteredStudents].sort((a, b) => {
        if(sortBy === "name") return a.name.localeCompare(b.name)
        if(sortBy === "age") return a.age - b.age
        if(sortBy === "attendance") return a.attendance - b.attendance
    })


    return (
        <div>
            
            <div>
                <label htmlFor="" className="form-label">Filter By Gender:</label>
                <select className="form-select" onChange={(e) => dispatch(setFilter(e.target.value))} >
                    <option value="All">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <label htmlFor="" className="form-label">Sort By :</label>
                <select className="form-select" onChange={(e) => dispatch(setSortBy(e.target.value))} >
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="attendance">Attendance</option>
                </select>


            </div>

            <div>
                <h2 className="py-2">Class View</h2>
                <ul className="list-group">
                {
                    status !== "loading" ? (
                        sortedArray.map(stud => (
                            <li key={stud._id} className="list-group-item ">
                                {stud.name} | {stud.age} | {stud.gender}
                            </li>
                        ))
                    ) : (
                        "Loading..."
                    )
                }
                {error && "There was an error!"}
                </ul>
            </div>





        </div>
    )
}
export default ClassView