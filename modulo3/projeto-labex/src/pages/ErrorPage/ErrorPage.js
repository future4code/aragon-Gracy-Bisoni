import { useNavigate } from "react-router-dom";
import { goToHomePage } from "../../routes/coordinator";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <>
        <h1>Error! Page not found</h1>
        <button onClick={() => goToHomePage(navigate)}>Back to HomePage</button>
        </>
    )
};

export default ErrorPage;