import { createBrowserRouter, Navigate } from "react-router";
import Home from "./pages/Home";
import Root from "./pages/Root";
import AddEditUsers from "./pages/AddEditUsers";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                element: <Navigate to={'/users'}/>
            },
            {
                path:'users',
                children:[
                    {
                        index:true,
                        element:<Home />
                    },
                    {
                        path:'add',
                        element:<AddEditUsers />
                    },
                    {
                        path:':id/edit',
                        element : <AddEditUsers />
                    }
                ]
            }
        ]
    }
])

export default router;