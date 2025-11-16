import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Student() {
    const [students, setStudents] = useState([])
    const [show, setShow] = useState(false);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")

    const [editStudent, setEditStudent] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(res => {
            console.log('🔄 DEBUG - Students data from API:', res.data);
            console.log('🔍 DEBUG - First student:', res.data[0]);
            setStudents(Array.isArray(res.data) ? res.data : []);
        })
        .catch(err => {
            console.log('❌ DEBUG - API Error:', err);
            setStudents([]);
        })
    }, [])

    const handleClose = () => {
        setShow(false)
        setEditStudent(null)
        setName("")
        setEmail("")
        setAge("")
    }
    
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // DEBUG: Check what we're sending to backend
        console.log('📤 DEBUG - Sending to backend:', {
            name: name,
            email: email, 
            age: age,
            ageType: typeof age
        });
        
        if(editStudent) {
            axios.put(`http://localhost:8081/update/${editStudent.ID}`, {
                name: name,
                email: email,
                age: age
            })
            .then(res => {
                console.log('✅ DEBUG - Update successful:', res.data);
                handleClose()
                window.location.reload()
            })
            .catch(err => console.log('❌ DEBUG - Update error:', err))
        } else {
            axios.post('http://localhost:8081/create', {
                name: name,
                email: email,
                age: age
            })
            .then(res => {
                console.log('✅ DEBUG - Create successful:', res.data);
                handleClose()
                window.location.reload()
            })
            .catch(err => console.log('❌ DEBUG - Create error:', err))
        }
    }

    const handleEdit = (student) => {
        console.log('✏️ DEBUG - Editing student:', student);
        console.log('🎯 DEBUG - Student age value:', student.Age, 'Type:', typeof student.Age);
        
        setEditStudent(student)
        setName(student.Name)
        setEmail(student.Email)
        setAge(student.Age)
        setShow(true)
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this student?")) {
            axios.delete(`http://localhost:8081/student/${id}`)
            .then(res => {
                window.location.reload()
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Student List</h2>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-success' onClick={handleShow}>Add +</button>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(students) && students.map((data, i) => (
                            <tr key={i}>
                                <td>{data.Name}</td>
                                <td>{data.Email}</td>
                                <td>{data.Age}</td>
                                <td>
                                    <button className='btn btn-primary me-2' 
                                        onClick={() => handleEdit(data)}>Edit</button>
                                    <button className='btn btn-danger' 
                                        onClick={() => handleDelete(data.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editStudent ? 'Edit Student' : 'Add Student'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="name">Name</label>
                                <input type="text" placeholder='Enter Name' className='form-control'
                                    value={name} onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder='Enter Email' className='form-control'
                                    value={email} onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="age">Age</label>
                                <input type="number" placeholder='Enter Age' className='form-control'
                                    value={age} 
                                    onChange={e => setAge(e.target.value)}
                                    min="1"
                                    max="100"
                                    required
                                />
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button type="button" className='btn btn-secondary me-2' onClick={handleClose}>Close</button>
                                <button type="submit" className='btn btn-primary'>
                                    {editStudent ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default Student