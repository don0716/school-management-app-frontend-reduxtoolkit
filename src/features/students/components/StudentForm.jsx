import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudentAsync, updateStudentAsync } from "../studentsSlice";
import { useLocation, useParams } from "react-router-dom";

const StudentForm = ({isAddStudent = false}) => {
    const dispatch = useDispatch()

    const location = useLocation()
    const student = location.state?.student
    const {studentId} = useParams()
    console.log( "Student:: " ,student)
    console.log("StudentiD:: " , studentId)

    const status = useSelector(state => state.students.status)
    console.log(status)

    const [formData, setFormData] = useState({
        name: student?.name || "",
        age: student?.age || "", 
        grade: student?.grade || "",
        gender: student?.gender || "",
        attendance: student?.attendance || "",
        marks: student?.marks || ""
    })

    const onChangeHandler = (e) => {
        const {name, value} = e.target

        setFormData(prevState => ({
            ...prevState,
            [name]: name === "attendance" || name === "marks" ? Number(value) :  value
        }))
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("FormData:: ", formData)

        if(isAddStudent ){
            dispatch(addStudentAsync(formData))
        } else {
            dispatch(updateStudentAsync({studentId , data: formData}))
        }



    }

    return (
        <>
        <div>
            <h2>Add Student</h2>

           <div className="row">
            <div className="col-6">
            <form onSubmit={handleSubmit}>
                <input className="form-control my-2" type="text" name="name" value={formData.name} onChange={onChangeHandler} placeholder="name" />
                <input className="form-control my-2" type="text" name="age" value={formData.age} onChange={onChangeHandler} placeholder="age" />
                <input className="form-control my-2" type="text" name="grade" value={formData.grade} onChange={onChangeHandler} placeholder="grade" /><br/>

                <label htmlFor="gender">Gender:</label>

                <input checked={formData.gender === "Male"} type="radio" name="gender" value="Male" onChange={onChangeHandler} placeholder="gender" /> Male

                <input checked={formData.gender === "Female"} type="radio" name="gender" value="Female" onChange={onChangeHandler} placeholder="gender" /> Female <br />

                {
                    !isAddStudent && (
                        <div>
                            <input className="form-control my-2" type="text" name="attendance" value={formData.attendance} onChange={onChangeHandler} placeholder="attendance" />

                            <input className="form-control my-2" type="text" name="marks" value={formData.marks} onChange={onChangeHandler} placeholder="marks" />
                        </div>
                    )
                }
                <br /><br />

                <button className="btn btn-primary" type="submit">{isAddStudent ? "Add Student" : "Update" }</button>
                
            </form>
            </div>
           </div>

        </div>
        </>
    )
}

export default StudentForm;