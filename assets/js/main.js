import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import LoginPage from "./pages/LoginPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import FinalPage from "./pages/FinalPage";
import AdminPage from "./pages/admin/AdminPage";
import StudentList from "./pages/StudentList";
import AuthAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRouter from "./components/PrivateRouter";
import AdminRoute from "./components/AdminRoute";
import ChallengePage from "./pages/ChallengePage";
import { HashRouter, Switch, Route, withRouter, useHistory, Redirect } from "react-router-dom";
import firebase from "./firebase";
import usersAPI from "./services/usersAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoPage from "./pages/VideoPage";

const App = () => {
    const history = useHistory();
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated);
    const db = firebase.firestore();

    useEffect(() => {
        AuthAPI.setup();
        AuthAPI.isAuthenticated();
        fetTchatMessage();
    }, [isAuthenticated])

    const fetTchatMessage = async () => {
        db.collection("tchat").onSnapshot((snapshot) => {
            let messages = []
            snapshot.forEach(async (doc) => {
                const { message } = doc.data()
                messages = [...messages, message]
            })

            if (isAuthenticated) {
                toast.dark(messages[messages.length - 1], {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    }

    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);

        toast.dark("Déjà fini ? 😲", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        // history.replace("/login");
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
                    {isAuthenticated && <button className="disconnect" onClick={handleLogout}>Déconnexion</button>}
                    <Switch>
                        <Route exact path="/">
                            {mainRoute}
                        </Route>
                        <Route
                            path="/student_list"
                            component={StudentList}
                        />
                        <Route
                            path="/video"
                            component={VideoPage}
                        />
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
        </AuthContext.Provider>
    )
}

const rootElement = document.getElementById("app");
ReactDom.render(<App />, rootElement);
