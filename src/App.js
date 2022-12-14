import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DemoPage from "./pages/DemoPage";
import { useAuth } from "./context/AuthContext";
import DashboardPage from "./pages/DashboardPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import DetailsPage from "./pages/DetailsPage";
import EditRecipePage from "./pages/EditRecipePage";

function App() {
    const {currentUser} = useAuth();
    
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={!currentUser ? <HomePage/> : <Navigate to="/dashboard"/>}/> 
                    <Route path="/login" element={!currentUser ? <LoginPage/> : <Navigate to="/dashboard"/>}/>
                    <Route path="/register" element={!currentUser ? <RegisterPage/> : <Navigate to="/dashboard"/>}/>
                    <Route path="/dashboard" element={currentUser ? <DashboardPage/> : <Navigate to="/"/>}/>
                    <Route path="/recipe/details/:recipeId" element={currentUser ? <DetailsPage/> : <Navigate to="/login"/>}/>
                    <Route path="/recipe/create" element={currentUser ? <CreateRecipePage/> : <Navigate to="/"/>}/>
                    <Route path="/recipe/edit/:recipeId" element={currentUser ? <EditRecipePage/> : <Navigate to="/"/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
