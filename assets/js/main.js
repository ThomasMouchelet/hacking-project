import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import LoginPage from "./pages/LoginPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import FinalPage from "./pages/FinalPage";
import AdminPage from "./pages/AdminPage";
import AuthAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRouter from "./components/PrivateRouter";
import ChallengePage from "./pages/ChallengePage";
import { HashRouter, Switch, Route, withRouter, useHistory } from "react-router-dom";
import firebase from "./firebase";
import Tchat from "./components/Tchat";

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
            snapshot.forEach(async (doc) => {
                const { message } = doc.data()
                let messages = [...tchatMessages, message]
                setTchatMessages(messages)
                console.log(tchatMessages);
            })
        })
    }

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
                <div>
                    <div className="tchat">
                        {/* <Tchat messages={tchatMessages} /> */}
                    </div>

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
                        <PrivateRouter
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
