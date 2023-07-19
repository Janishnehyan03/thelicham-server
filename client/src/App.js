import { Route, Routes } from "react-router-dom";
import ImageLibrary from "./pages/admin/ImageLibrary";
import DashBoard from "./pages/admin/Dashboard";
import Header from "./components/Header";
import { UserContextProvider } from "./utils/userContext";
import PostUpload from "./components/admin/PostUpload";
import Login from './pages/auth/Login'

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
