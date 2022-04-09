import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
import LoginView from "./routes/login-view";
import GameView from "./routes/game-view";
import SummaryView from "./routes/summary-view";
import PrivateRoute from "./routes/privateroute";

function App() {
  const isAuthenticated =
    useSelector(({ game: { userName } }: RootState) => userName).length > 0;
  const score = useSelector(({ game: { score } }: RootState) => score);
  const hasGameFinished = React.useMemo(() => {
    const { right, wrong, missed } = score;
    return right === 0 && wrong === 0 && missed === 0 ? false : true;
  }, [score]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route
          path="/game"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              outlet={<GameView />}
            />
          }
        />
        <Route
          path="/summary"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated && hasGameFinished}
              outlet={<SummaryView />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
