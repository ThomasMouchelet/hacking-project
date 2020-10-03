import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import LoginPage from "./pages/LoginPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import FinalPage from "./pages/FinalPage";
import AuthAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRouter from "./components/PrivateRouter";
import ChallengePage from "./pages/ChallengePage";
import { HashRouter, Switch, Route, withRouter, useHistory } from "react-router-dom";

const App = () => {
    const history = useHistory();
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated);

    useEffect(() => {
        AuthAPI.setup();
        AuthAPI.isAuthenticated();
    }, [])

    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        history.replace("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
            }}
        >
            <HashRouter>
                {isAuthenticated && <button onClick={handleLogout}>Déconnexion</button>}
                <Switch>
                    {!isAuthenticated &&
                        <Route
                            path="/login"
                            render={(props) => <LoginPage {...props} />}
                        />
                    }

                    <PrivateRouter
                        path="/challenge"
                        component={ChallengePage}
                    />
                    <PrivateRouter
                        path="/create_team"
                        component={CreateTeamPage}
                    />
                    <PrivateRouter
                        path="/final_page"
                        component={FinalPage}
                    />
                </Switch>
            </HashRouter>
        </AuthContext.Provider>
    )
}

const rootElement = document.getElementById("app");
ReactDom.render(<App />, rootElement);
