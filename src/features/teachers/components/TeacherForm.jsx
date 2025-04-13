import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTeacherAsync, fetchTeachers, udpateTeacherAsync } from "../teachersSlice"
import { useParams, useLocation } from "react-router-dom"


const TeacherForm = ({isAddTeacher}) => {
    const dispatch = useDispatch()
    // const {teachers, status, error } = useSelector(state => state.teachers)
    // console.log("Teachers", teachers, status, error)
    const {teacherId}  = useParams()
    const location = useLocation()
    const teacher = location.state?.teacherData
    console.log("teacher:: ", teacher )
    console.log("TeacherId::" , teacherId)

    const {status} = useSelector(state => state.teachers)
    console.log(status)

  

    const [formData, setFormData] = useState({
        name: "" || teacher?.name ,
        age: "" || teacher?.age,
        gender: ""|| teacher?.gender,
        attendance: "" || teacher?.attendance,
        experience: "" || teacher?.experience
    })

    const onChangeHandler = (e) => {
        const {name, value} = e.target

        setFormData(prevState => ({
            ...prevState,
            [name]: name === "age" || name === "attendance" ? Number(value) : value
        }))
        
    }

    const submitForm = (e) => {
        e.preventDefault()
        
        isAddTeacher ? dispatch(addTeacherAsync(formData)) : dispatch(udpateTeacherAsync({teacherId, data: formData}))
        
    }


    return (
        <div>
            <div>
                {status === "adding" ? "Adding..." : status === "added" ? "Successfully Added Student" : status === "updating" ? "Updating..." : status === "updated" ? "Successfully Updated Student" : "" }
            </div>
            
            <div className="row">
                <div className="col-md-6">
                <form onSubmit={submitForm}>
                <label htmlFor="" className="form-label">Name:</label>
                <input name="name" type="text" onChange={onChangeHandler} value={formData.name} className="form-control" />

                <label htmlFor="" className="form-label">Age:</label>
                <input name="age" type="text" onChange={onChangeHandler} value={formData.age} className="form-control" />

                <label htmlFor="" className="form-label">Attendance:</label>
                <input name="attendance" type="text" onChange={onChangeHandler} value={formData.attendance} className="form-control" />

                <label htmlFor="" className="form-label py-2">Gender:</label>
                <input checked={formData.gender === "Male"} name="gender" type="radio" onChange={onChangeHandler} value="Male" className="" /> Male
                <input checked={formData.gender === "Female"} name="gender" type="radio" onChange={onChangeHandler} value="Female" className="form-" /> Female  <br />

                <label htmlFor="" className="form-label py-2">Experience:</label>
                <input checked={formData.experience === "Beginner"} name="experience" type="radio" onChange={onChangeHandler} value="Beginner" className="" /> Beginner
                <input checked={formData.experience === "Advanced"} name="experience" type="radio" onChange={onChangeHandler} value="Advanced" className="" /> Advanced  <br />



                <button className="btn btn-primary my-2" type="submit">{isAddTeacher ? "Add Teacher" : "Update Teacher"}</button>


            </form>
                </div>
            </div>
            
            
        </div>
    )
}

export default TeacherForm