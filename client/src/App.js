import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PostUpload from "./components/admin/PostUpload";
import DashBoard from "./pages/admin/Dashboard";
import ImageLibrary from "./pages/admin/ImageLibrary";
import Login from './pages/auth/Login';
import { UserContextProvider } from "./utils/userContext";


export default function App() {
  return (
    <>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/image-library" element={<ImageLibrary />} />
          <Route path="/create-post" element={<PostUpload />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}
