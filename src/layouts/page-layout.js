import { Outlet } from "react-router-dom";
import NavigationBar from "./navbar";
import FooterBar from "./footer";


function PageLayout() {
  return (
    <div>
      <NavigationBar />
      <div className="mt-16 mb-12 ml-7">
        <Outlet />
      </div>
      <FooterBar />
    </div>
  );
}

export default PageLayout;
