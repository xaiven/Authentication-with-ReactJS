import React from 'react'
import * as ReactBootStrap from 'react-bootstrap'
import './style.css';


export default function Candidate({ candidate, close }) {

    const columns = ['ID', 'First name', 'Last name', 'Email', 'Gender', 'Job title', 'Job description', 'Avatar'];

    return (
        <div>
            <br /><h4>Details for {candidate.first_name + ' ' + candidate.last_name}</h4><br />

            <ReactBootStrap.Table className='cand' striped bordered hover variant="dark" size="sm" background-color='#282c34'>
                <thead>
                    <tr>
                        {columns.map(col => (<th key={col}>{col}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr  /* key={line.id} */>
                        <>
                            <td>{candidate.id}</td>
                            <td>{candidate.first_name} </td>
                            <td>{candidate.last_name}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.gender}</td>
                            <td>{candidate.job_title}</td>
                            <td>{candidate.job_description}</td>
                            <td><img width={50} src={candidate.avatar} alt={candidate.last_name} /></td>
                        </>
                    </tr>
                </tbody>
            </ReactBootStrap.Table>

            <br /><button className='btn1' onClick={close} >Back</button><br />
        </div>
    )
}
