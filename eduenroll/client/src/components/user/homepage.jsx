import React from 'react';
import { CourseDisplay} from '../shared/courses/courseCards';
import { Head } from '../shared/components/pageHeader';
import { NavColumn } from '../shared/components/sideBar';
import {Footer} from '../../shared/components/footer';
function HomePage() {
    return (

        <div className="home-page">
            <Head />
            <NavColumn role='user' />
            <CourseDisplay />
            <Footer />
        </div>
    );
}
export default HomePage;