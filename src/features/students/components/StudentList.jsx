import { Link } from "react-router-dom";

const StudentList = ({students, error, status}) => {
    
    return (
        <div className="row">
             <div className="col-6">
             <ul className="list-group">
            {
                status === "loading" ? "Loading..." : (
                    students.map((student) => (
                        <li className="list-group-item" key={student._id}>
                            <Link to={`/studentdetail/${student._id}`} >{student.name} (Age: {student.age} )</Link>
                        </li>
                    ) )
                )
            } 
        </ul>
        {error && "There was an error in the backend!"}
             </div>
        </div>
    )
}

export default StudentList;