import React, { useState, useEffect } from 'react';
import Inicio from './pages/inicio';
import Teachers from './pages/teachers';
import TeacherDetail from './pages/teacher_detail';
import Login from './pages/login';
import Course from './pages/course';
import Courses from './pages/courses';
import CoursePlayer from './pages/course-player';
import Contact from './pages/contact';
import Admin from './pages/admin';
import About from './pages/about';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/customRouter/privateRoute';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

const TempleApp = () => {
 
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={Inicio} />
                    <Route path="/courses" component={Courses} />
                    <Route path="/teachers" component={Teachers} />
                    <Route path="/teacher-detail" component={TeacherDetail} />
                    <Route path="/course" component={Course} />
                    <Route path="/course-player" component={CoursePlayer} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/about" component={About} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute exact path="/admin" component={Admin} />
                    <Redirect to="/" />
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default TempleApp;