import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { MainLayout } from "./MainLayout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router"; // Fix import path
import { useState } from "react";
import { useImageFetching } from "./images/useImageFetching.js"; // Move useImageFetching to App
import RegisterPage from "./auth/RegisterPage.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";
function App() {
    const [accountName, setAccountName] = useState("John Doe");
    const [authToken, setAuthToken] = useState(null);

    
    // Lifted state: Fetch images once and keep them in App state
    const { isLoading, fetchedImages } = useImageFetching("", 1000, authToken);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Homepage userName={accountName} />} />
                    <Route 
                        path="images" 
                        element={<ProtectedRoute authToken={authToken}>
                                <ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} authToken={authToken}/>
                                </ProtectedRoute>} 
                    />
                    <Route 
                        path="images/:imageID" 
                        element={
                        <ImageDetails/>
                        } 
                    />
                    <Route 
                        path="account" 
                        element={<ProtectedRoute authToken={authToken}>
                        <AccountSettings accountName={accountName} setAccountName={setAccountName}/>
                        </ProtectedRoute>} 
                    />
                    <Route path="register" element={<RegisterPage setAuthToken={setAuthToken} />} />
                    <Route path="login" element={<LoginPage setAuthToken={setAuthToken} />} />
                    </Route>
            </Routes>
        </Router>
    );
}

export default App;
