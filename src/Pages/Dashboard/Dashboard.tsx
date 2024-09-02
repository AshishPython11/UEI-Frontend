import React, { useEffect } from 'react'
import MainContent from '../../Components/MainContent/MainContent'

function Dashboard() {
    return (
        <div className='dashboard'>

            <div className='card'>
                <div className='card-body'>
                    <h1>Dashboard</h1>
                   <MainContent /> 
                </div>
            </div>
        </div>
    )
}

export default Dashboard
