import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchStudents } from "../studentsSlice"
import { updateSchoolStats } from "../studentsSlice"
import { fetchTeachers, updateSchoolTeacherStats } from "../../teachers/teachersSlice"

const SchoolView = () => {
    const dispatch = useDispatch()

    const {students, schoolStats, status, error} = useSelector(state => state.students)
    console.log("School Stats::", schoolStats)
    console.log(status, "error::", error)
    const {teachers, schoolTeacherStats} = useSelector(state => state.teachers)
    console.log("stats:: ", schoolTeacherStats)

    useEffect(()=> {
        dispatch(fetchStudents())
        
    }, [])
    useEffect(() => {
        dispatch(fetchTeachers())
    }, [])

    useEffect(() => {
        if(students.length > 0){
            const totalStudents = students.length

            const averageAttendance = (students.reduce((acc, curr) => curr.attendance + acc , 0)/totalStudents).toFixed(2)

            const averageMarks = (students.reduce((acc, curr) => curr.marks + acc , 0)/totalStudents).toFixed(2)

            const topPerformingStudent = students.reduce((acc, curr) => curr.marks > acc.marks ? curr : acc , students[0] )

            dispatch(updateSchoolStats({
                totalStudents: totalStudents,
                averageAttendance: averageAttendance,
                averageMarks: averageMarks,
                topStudent: topPerformingStudent.name,
            }))

            // console.log("total::", totalStudents)
            // console.log("avg attendance::", averageAttendance)
            // console.log("avg Marks::", averageMarks)
            // console.log("Top Student::", topPerformingStudent)

        }
        if(teachers.length > 0){
            const totalTeachers = teachers.length
            dispatch(updateSchoolTeacherStats(totalTeachers))
        }

    }, [students])
   


    return (
        <div>
            <h1>School View</h1>

            <div className="row">
                <div className="col-md-6">
                <div className="card">

                    <div className="card-body">
                        <p><strong>Total Students:</strong> {schoolStats.totalStudents}  </p>
                        <p><strong>Average Attendance:</strong> {schoolStats.averageAttendance}  </p>
                        <p><strong>Average Marks:</strong> {schoolStats.averageMarks}  </p>
                        <p><strong>Top Student:</strong> {schoolStats.topStudent} </p>
                        <p><strong>Total Teachers: </strong>{schoolTeacherStats.totalTeachers}</p>
                    </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default SchoolView