import "./index.css"
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import jwt from 'jwt-decode'

import NavBar from './components/NavBar'
import MainPage from './pages/MainPage';
import StandingsPage from "./pages/StandingsPage";
import GamePage from './pages/GamePage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from "./pages/AdminDashboard";
import GamesOfTheDay from "./pages/GamesOfTheDayPage";
import AccessDenied from "./pages/AccessDenied";

/**
 * Representa uma rota privada, que se retorna a página ao utilizador 
 * caso este tenha um dos roles necessários para aceder à mesma
 * 
 * @param {*} props pode receber vários tipos, neste caso recebe um componente que será apresentado 
 * e um array com os roles que podem aceder ao componente
 * @returns 
 */
function PrivateRoute(props) {
    const isAuthenticated = localStorage.getItem('isLogged')
    let userHasRequiredRole = false;
    if(isAuthenticated) {
        const user = jwt(localStorage.getItem('app-token'))
        userHasRequiredRole = user && props.roles.some(u => {return u === user.role} ) ? true : false
    }

    if(isAuthenticated && userHasRequiredRole) {
        return props.component
    }

    if(isAuthenticated && !userHasRequiredRole) {
        return <AccessDenied />
    }

    return <Navigate to="/" />
}

/**
 * Componente principal onde estão definidas todas as rotas da aplicação
 * @returns as rotas das páginas correspondentes
 */
function App() {

    let isLogged = false;
    if(localStorage.getItem('isLogged')){
    isLogged = localStorage.getItem('isLogged')

}
    return(
        <Router>
            <NavBar className="nav"/>
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route exact path= "/profile/:match_id" element ={<ProfilePage />} />
                <Route exact path="/standings" element={<StandingsPage className="standings" />} />
                <Route exact path= "/game-page/:match_id" element ={<GamePage isLogged={isLogged}/>} />
                <Route exact path="/admindashboard" element={<PrivateRoute roles={['Admin']} component={<AdminDashboard />} />} />
                <Route exact path="/matchs/today" element={<GamesOfTheDay />} />
            </Routes>
        </Router>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)