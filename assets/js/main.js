import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import LoginPage from "./pages/LoginPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import FinalPage from "./pages/FinalPage";
import AdminPage from "./pages/AdminPage";
import AuthAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRouter from "./components/PrivateRouter";
import AdminRoute from "./components/AdminRoute";
import ChallengePage from "./pages/ChallengePage";
import { HashRouter, Switch, Route, withRouter, useHistory, Redirect } from "react-router-dom";
import firebase from "./firebase";
import Tchat from "./components/Tchat";
import usersAPI from "./services/usersAPI";

const App = () => {
    const history = useHistory();
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated);
    const db = firebase.firestore();
    const [tchatMessages, setTchatMessages] = useState([])

    useEffect(() => {
        fetTchatMessage()
        AuthAPI.setup();
        AuthAPI.isAuthenticated();
    }, [])

    const fetTchatMessage = async () => {
        db.collection("tchat").onSnapshot((snapshot) => {
            let messages = []
            snapshot.forEach(async (doc) => {
                const { message } = doc.data()
                messages = [...messages, message]
                setTchatMessages(messages)
                console.log(messages);
            })
        })
    }

    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        history.replace("/login");
    };

    const mainRoute = () => {
        if (!isAuthenticated) {
            return <Redirect to="/login" />
        } else if (isAuthenticated && usersAPI.isAdmin()) {
            return <Redirect to="/admin" />
        } else if (isAuthenticated && !usersAPI.isAdmin()) {
            return <Redirect to="/challenge" />
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
            }}
        >
            <HashRouter>
                <div>
                    {isAuthenticated &&
                        <div className="tchat">
                            <Tchat messages={tchatMessages} />
                        </div>
                    }
                    {isAuthenticated && <button onClick={handleLogout}>Déconnexion</button>}
                    <Switch>
                        <Route exact path="/">
                            {mainRoute}
                        </Route>
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
                        <AdminRoute
                            path="/admin"
                            component={AdminPage}
                        />
                    </Switch>
                </div>
            </HashRouter>
        </AuthContext.Provider>
    )
}

const rootElement = document.getElementById("app");
ReactDom.render(<App />, rootElement);
