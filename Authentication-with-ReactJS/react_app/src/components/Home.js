import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import './style.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import Candidate from './Candidate';

export default function Home() {
    const token = localStorage.getItem("token")
    const [openDetails, setOpenDetails] = useState(null)
    const [data, setData] = useState([])
    let columns = [];

    useEffect(() => {
        const fetchCandidates = async (e) => {
            return axios
                .get("http://localhost:8080/api/candidates", {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                })
                .then((response) => response.data)
                .catch((error) => error);
        }

        if (token) {
            fetchCandidates().then(res => { console.log('res', res); setData(res.data) })
                .catch(err => console.log(err))
        }
        console.log('token', token);
    }, [])


    if (data.length) {
        columns = data.length ? ['#', 'Avatar', 'Full name', 'Job title', ' '] : [];
    }

    const onClickDetails = (id) => {
        setOpenDetails(id);
    }
    const onCloseDetails = () => {
        setOpenDetails(null)
    }

    return (!token ? // If no token, login or signup
        <div>
            <br /><h2>Tami-4</h2><br />
            <Link to='/login'><button className='btn1'> Log in </button></Link><br />
            <Link to='/signup'><button className='btn1'> Sign Up </button></Link>
        </div>

        : // or if token exists render the data
        openDetails ? <Candidate candidate={openDetails} close={onCloseDetails} /> :
            <div>
                <br />
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            {columns.map(col => (<th key={col}>{col}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((line, ind) => (<tr key={line.id}>{
                            <>
                                <td>{ind + 1}</td>
                                <td><img width={70} src={line.avatar} alt={line.last_name} /></td>
                                <td>{line.first_name + ' ' + line.last_name} </td>
                                <td>{line.job_title}</td>
                                <td><button className='btn1' onClick={() => onClickDetails(line)}>Full details</button> </td>
                            </>
                        }</tr>))}
                    </tbody>
                </Table>
            </div>
    )
}
