import { Provider } from "react-redux";
import { store } from "./context/store";
import { Game } from "./components/game";

export default function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}
