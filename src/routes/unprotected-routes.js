import Login from "../pages/login"

const unprotectedRoutes = [
    {
        path : "/",
        element : <Login/>
    },
    {
        path : "/login",
        element : <Login/>
    }
] 

export default unprotectedRoutes;