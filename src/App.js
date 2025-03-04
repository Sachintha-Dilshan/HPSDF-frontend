import {Fragment} from 'react';
import AppRoutes from "./routes/app-routes";

function App() {
  return (
    <div className="App" style={{ fontFamily: "Noto Sans Sinhala" }}>
      <Fragment>
        <AppRoutes />
      </Fragment>
    </div>
  );
}

export default App;
