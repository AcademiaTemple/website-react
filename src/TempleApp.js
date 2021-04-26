import React from 'react';
import Home from './pages/home';
import Teachers from './pages/teachers';
import TeacherDetail from './pages/teacher_detail';
import Login from './pages/login';
import Course from './pages/course';
import Courses from './pages/courses';
import CoursePlayer from './pages/course_player';
import Contact from './pages/contact';
import Admin from './pages/admin';
import About from './pages/about';
import EnrEvent from './pages/enr_event';
import VisorCertificado from './pages/view_cert'
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/customRouter/privateRoute';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

const TempleApp = () => {

    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/courses" component={Courses} />
                    <Route exact path="/teachers" component={Teachers} />
                    <Route exact path="/teacher-detail" component={TeacherDetail} />
                    <Route exact path="/course" component={Course} />
                    <Route exact path="/course-player" component={CoursePlayer} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/enr-event/:id" component={EnrEvent} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/view-cert/:id" component={VisorCertificado} />
                    <PrivateRoute exact path="/admin" component={Admin} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default TempleApp;