
const email = "bhaveshanandpara12@gmail.com"

const password = Math.random().toString(36).slice(2, 10)

let mailOptions = (toMail, newCourse) => {

    return {
        from: email,
        to: toMail,
        subject: 'New Course Assigned',
        text: `
        You have been assigned a new Course\n Course Details : 
        
        courseId: ${newCourse.courseId}
        courseName: ${newCourse.courseName}
        courseType: ${newCourse.courseType}
        academicSession: ${newCourse.academicSession}
        `

    }
};

module.exports = { email, mailOptions }