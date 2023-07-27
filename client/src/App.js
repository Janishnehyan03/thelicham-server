import { Route, Routes } from "react-router-dom";
import DashboardMain from "./components/Dashboard/DashboardMain";
import ImageLibrary from "./pages/admin/ImageLibrary";
import Login from "./pages/auth/Login";
import { UserContextProvider } from "./utils/userContext";
import PostUpload from './components/admin/PostUpload'
import PostsTable from "./components/admin/PostsTable";
import Profile from './pages/Profile'

export default function MyReactApp() {
  return (
    <>
      <UserContextProvider>
        {/* <Header /> */}
        <Routes>
          <Route
            path="/dashboard"
            element={
              <DashboardMain>
                <PostsTable />
              </DashboardMain>
            }
          />
          <Route path="/create-post" element={ <DashboardMain>
                <PostUpload />
              </DashboardMain>} />
          <Route path="/image-library" element={<ImageLibrary />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}
