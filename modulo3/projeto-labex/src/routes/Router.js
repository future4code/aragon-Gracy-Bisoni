import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage/HomePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomePage />}/>
                <Route path={"/admin"} element = {<AdminPage />}/>
                <Route path={"*"} element = {<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;