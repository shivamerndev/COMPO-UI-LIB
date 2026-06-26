import { createBrowserRouter } from "react-router-dom"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import App from "./App"
import Home from "../features/global/pages/Home"
import Generate from "../features/ai/Generate"
import Pricing from "../features/payment/pages/Pricing"
import Checkout from "../features/payment/pages/Checkout"
import ProtectedRoute from "../features/auth/pages/ProtectedRoute"
import PublicRoute from "../features/auth/pages/PublicRoute"
import ComponentList from "../features/code/pages/ComponentList"
import Google from "../features/auth/pages/Google"
import Profile from "../features/auth/pages/Profile"

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: "/g/login",
                        element: <Google />
                    },{
                        path : "/login",
                        element : <Login/>
                    },
                    {
                        path  : "/register",
                        element : <Register/>
                    }
                ]
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path : "/profile",
                        element : <Profile/>
                    },
                    {
                        path: "/generate",
                        element: <Generate />
                    },
                    {
                        path: "/pricing",
                        element: <Pricing />
                    },
                    {
                        path: "/checkout",
                        element: <Checkout />
                    },
                    {
                        path: "/c/create",
                        element: <Generate />
                    },
                    {
                        path: "/c/:cid",
                        element: <Generate />
                    },
                    {
                        path: "/c/list",
                        element: <ComponentList />
                    },
                ]
            },


        ]
    }
])