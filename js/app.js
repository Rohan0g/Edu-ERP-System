/**
 * Edu ERP System - LocalStorage Data Engine
 */

// Custom Student Data for GIET MCA Students
const INITIAL_STUDENTS = [
    { id: 1001, code: '25MCA016', firstName: 'ROHAN', lastName: 'PATTNAIK', email: '25mca016.rohanpattnaik@giet.edu', phone: '+91 9876543210', department: 'Computer Science', course: 'MCA', gpa: 7.77, date: '2025-08-01' },
    { id: 1002, code: '25MCA017', firstName: 'ADITYA PRASAD', lastName: 'PATTNAYAK', email: '25mca017.adityaprasadpattnayak@giet.edu', phone: '+91 9876543211', department: 'Computer Science', course: 'MCA', gpa: 9.82, date: '2025-08-01' },
    { id: 1003, code: '25MCA015', firstName: 'KARTIK', lastName: 'SAHOO', email: 'KARTIK@GMAIL.COM', phone: '+91 9876543212', department: 'Computer Science', course: 'MCA', gpa: 8.65, date: '2025-08-01' }
];

// Initialize Data Storage with updated custom records
function initStorage(forceReset = false) {
    if (forceReset || !localStorage.getItem('sms_students_v3')) {
        localStorage.setItem('sms_students_v3', JSON.stringify(INITIAL_STUDENTS));
    }
}

// Get all students
function getStudents() {
    initStorage();
    return JSON.parse(localStorage.getItem('sms_students_v3')) || [];
}

// Save students list
function saveStudents(students) {
    localStorage.setItem('sms_students_v3', JSON.stringify(students));
}

// Get single student by ID
function getStudentById(id) {
    const students = getStudents();
    return students.find(s => s.id == id);
}

// Add or Update Student
function saveStudent(studentData) {
    const students = getStudents();
    if (studentData.id) {
        const index = students.findIndex(s => s.id == studentData.id);
        if (index !== -1) {
            students[index] = { ...students[index], ...studentData };
        }
    } else {
        const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1001;
        const newStudent = {
            id: newId,
            ...studentData
        };
        students.unshift(newStudent);
    }
    saveStudents(students);
}

// Delete Student
function deleteStudent(id) {
    let students = getStudents();
    students = students.filter(s => s.id != id);
    saveStudents(students);
}

// Search Students
function searchStudents(query) {
    const students = getStudents();
    if (!query) return students;
    const q = query.toLowerCase().trim();
    return students.filter(s =>
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    );
}

// Authentication Check
function checkAuth() {
    const loggedInUser = sessionStorage.getItem('sms_user');
    const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
    
    if (!loggedInUser && !isLoginPage) {
        window.location.href = 'index.html';
    } else if (loggedInUser && isLoginPage) {
        window.location.href = 'dashboard.html';
    }
}

// Logout
function logout() {
    sessionStorage.removeItem('sms_user');
    window.location.href = 'index.html';
}

// Auto Initialize
initStorage();
