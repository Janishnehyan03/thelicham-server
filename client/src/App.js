import { Route, Routes } from "react-router-dom";
import DashboardMain from "./components/Dashboard/DashboardMain";
import ImageLibrary from "./pages/admin/ImageLibrary";
import Login from "./pages/auth/Login";
import { UserContextProvider } from "./utils/userContext";
import PostUpload from './components/admin/PostUpload'
import PostsTable from "./components/admin/PostsTable";

export default function App() {
  return (
    <>
      <UserContextProvider>
        {/* <Header /> */}
        <Routes>
          <Route
            path="/"
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
        </Routes>
      </UserContextProvider>
    </>
  );
}
