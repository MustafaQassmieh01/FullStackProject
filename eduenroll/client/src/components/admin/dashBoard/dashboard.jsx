import { Navigate } from "react-router-dom";
// import {HomePage} from '../homepage'

function DashBoard(admin){
    const nav = Navigator()
    if(!admin){
        nav.Navigate('/user/homepage');
    }else{
        nav.Navigate('/admin/homepage');
    }
}