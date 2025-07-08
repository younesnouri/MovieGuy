import logo from './logo.svg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Header } from "./components/Header"
import { Add } from "./components/Add"
import { Watched }  from "./components/Watched"
import { Watchlist } from "./components/Watchlist"
import { Favorites } from "./components/Favorites"
import { Home } from "./components/Home"
import { Profile } from "./components/Profile"
import "./lib/font-awesome/css/all.min.css"
import { GlobalProvider } from './context/GlobalState';
import { UserRegistration } from './components/UserRegistration';
import { Login } from './components/Login';
import { PrivateRoutes } from './components/PrivateRoutes';
import { AuthProvider } from './components/AuthProvider';
import { MovieDetails } from './components/MovieDetails';
import { Reviews } from './components/Reviews';
import { LoginRegistration } from './components/LoginRegistration';
import { Recommend } from './components/recommend/Recommend';
import { Findsimilar } from './components/recommend/Findsimilar';
import { Dashboard } from './components/dashboard/Dashboard';
import { UserProfile } from './components/UserProfile';
function App() {
  return (
    <AuthProvider>
     <GlobalProvider>
    <Router>
    
    <Header />
    <Routes>
      <Route element = {<PrivateRoutes/>}>
      <Route path="/" element={<Watchlist />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Watched" element={<Watched />} />
      <Route path="/Favorites" element={<Favorites />} />
      <Route path="/Add" element={<Add />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/Reviews" element={<Reviews />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Findsimilar" element={<Findsimilar />} />
      <Route path="/Recommend" element={<Recommend />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/profile/:username" element={<UserProfile />} />
      </Route>
      
      <Route path="/Register" element={<UserRegistration />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Login1" element={<LoginRegistration />} />
    </Routes>
    
  </Router>
  </GlobalProvider>
  </AuthProvider>
  );
}
 
export default App;
