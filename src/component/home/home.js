import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            Click <Link to="/questions"><strong> here </strong></Link> to start your quiz
        </div>
    )
} 


export default Home;