import React from 'react';
import '../Landing/Landing.css'
import Header from '../Header/Header.component'
import ContentContainer from '../Content-Container/ContentContainer.component';
import Footer from '../Footer/Footer.component'

const Landing = () => {
    return (
        <div className="container-app">
            <Header />
            <ContentContainer></ContentContainer>
            <Footer></Footer>
        </div>
    )
}
    
export default Landing;