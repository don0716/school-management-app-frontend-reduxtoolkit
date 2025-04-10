import { Link } from "react-router-dom";

const StudentList = ({students}) => {
    
    return (
        <div className="row">
             <div className="col-6">
             <ul className="list-group">
            {
                students.map((student) => (
                    <li className="list-group-item" key={student._id}>
                        <Link to={`/studentdetail/${student._id}`} >{student.name} (Age: {student.age} )</Link>
                    </li>
                ) )
            } 
        </ul>
             </div>
        </div>
    )
}

export default StudentList;