import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {AboutMe, Contact, Projects, Whatiuse} from "./components";
import {mainPath} from "./constants/app.ts";


const router = createBrowserRouter([
    {
        path: mainPath,
        element: <App/>,
        children: [
            {
                path: '',
                element: <AboutMe/>,
            },
            {
                path: 'contact',
                element: <Contact/>,
            },
            {
                path: 'project',
                element: <Projects/>,
            },
            {
                path: 'whatiuse',
                element: <Whatiuse/>,
            }
        ]
    }
])

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
