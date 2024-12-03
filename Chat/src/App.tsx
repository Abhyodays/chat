import AuthProvider from "./context/authContext";
import Router from "./router/Router";

const App = () => {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    )
}

export default App;