import { useNavigate } from "react-router-dom";
import { goToAdminPage, goToHomePage } from "../../routes/coordinator";

const Header = (props) => {
    const navigate = useNavigate();

    const renderHeader = () => {
        switch (props.currentPage) {
            case "homepage":
                return(
                    <button onClick = {() => goToAdminPage(navigate)}>Go to AdminPage</button>
                );
            case "adminpage":
                return (
                    <button onClick={() => goToHomePage(navigate)}>Go to HomePage</button>
                );
            default: 
                return;
        }
    }

    return (
        <header>
            <h1>LabeX</h1>
            {renderHeader()}
        </header>
    )
};

export default Header;