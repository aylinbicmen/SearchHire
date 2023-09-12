import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import Services from "./components/Services";
import Logout from "./components/Logout";
import WorkForm from "./components/WorkForm";
import Profile from "./components/Profile";
import EditUser from "./components/EditUser";
import UserPosts from "./components/UserPosts";
import UserPostDetail from "./components/UserPostDetail";
import MasterUserDetail from "./components/MasterUserDetail";
import MasterUsers from "./components/MasterUsers";
import Posts from "./components/Posts";
import PostDetail from "./components/PostDetail";
import SearchResults from "./components/SearchResults";
import About from "./components/About";
import Error from "./components/Error";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/services', element: <Services /> },
    { path: '/logout', element: <Logout /> },
    { path: '/workform', element: <WorkForm /> },
    { path: '/profile', element: <Profile/> },
    { path: '/edituser', element: <EditUser/> },
    { path: '/userposts', element: <UserPosts/> },
    { path: '/about', element: <About/> },
    { path: '/searchresults/:searchData', element: <SearchResults/> },
    { path: '/posts/:specialtyId', element: <Posts/> },
    { path: '/post/:id', element: <PostDetail/> },
    { path: '/userposts/:id', element: <UserPostDetail/> },
    { path: '/masterusers/:specialtyId/:cityId', element: <MasterUsers/> },
    { path: '/masteruser/:id/:cityId', element: <MasterUserDetail/> },
    { path: '*', element: <Error/> }
])