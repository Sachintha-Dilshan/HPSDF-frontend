import { Route, Routes } from "react-router-dom";
import RequireAuth from "../utils/require-auth";
import RedirectIfLoggedIn from "../utils/redirect-if-logged-in";

import HRRoutes from "./HR-routes";
import ArchiveRoutes from "./Archive-routes";
import unprotectedRoutes from "./unprotected-routes";

import PageLayout from "../layouts/page-layout";
import NoPage from "../pages/no-page";
import RedirectToDashboard from "../utils/redirect-to-dashboard";

const AppRoutes = () => {
  // const protectedRoutes = [HRRoutes];
  // const unProtectedRoutes = [unprotectedRoutes];

  return (
    <Routes>
      {unprotectedRoutes.map((item) => {
        return (
          <Route
            key={item.path}
            exact
            path={item.path}
            element={<RedirectIfLoggedIn>{item.element}</RedirectIfLoggedIn>}
          />
        );
      })}

      <Route path="/" element={<PageLayout />}>
        <Route path="dashboard" element={<RedirectToDashboard />} />
        {HRRoutes.map((item) => {
          return (
            <Route
              key={item.path}
              exact
              path={item.path}
              element={
                <RequireAuth userroles={item.availability}>
                  {item.element}
                </RequireAuth>
              }
            />
          );
        })}

        {ArchiveRoutes.map((item) => {
          return (
            <Route
              key={item.path}
              exact
              path={item.path}
              element={
                <RequireAuth userroles={item.availability}>
                  {item.element}
                </RequireAuth>
              }
            />
          );
        })}

        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
