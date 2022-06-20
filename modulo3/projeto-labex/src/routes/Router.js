import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage/HomePage';
import AdminPage from '../pages/AdminPage/AdminPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import { TripDetailsPage } from "../pages/TripDetailsPage/TripDetailsPage";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<HomePage />}/>
                <Route path={"/admin"} element = {<AdminPage />}/>
                <Route path={"/admin/:tripId/details"} element={<TripDetailsPage/>}/>
                <Route path={"*"} element = {<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;