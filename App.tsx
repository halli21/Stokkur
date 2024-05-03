import { Provider } from "react-redux";
import { store } from "./context/store";
import { Game } from "./components/game";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <Game />
      </GestureHandlerRootView>
    </Provider>
  );
}
