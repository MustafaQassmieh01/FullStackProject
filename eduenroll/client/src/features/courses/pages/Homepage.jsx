import React from 'react';
import CourseDisplay from '../components/CourseCards';
import Head  from '../../../core/components/PageHeader';
import NavColumn from '../../../core/components/SideBar';
import Footer from '../../../core/components/Footer';
function HomePage() {
    return (

        <div className="home-page bg-gray-100 min-h-screen">
            <Head />
            
            <div className="content-container flex p-6 max-w-7xl mx-auto">
                <NavColumn role='user' />
                <CourseDisplay />
            </div>
            <Footer />
        </div>
    );
}
export default HomePage;