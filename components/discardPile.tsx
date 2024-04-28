import { Image } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { pickUpDeck } from "../context/reducers/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";

export const DiscardPile = () => {
  const dispatch = useDispatch();
  const discardPile = useSelector((state: RootState) => state.game.discardPile);
  return (
    <TouchableOpacity className="m-3" onPress={() => dispatch(pickUpDeck())}>
      {discardPile.length > 0 && (
        <Image
          className="w-16 h-24"
          source={discardPile[discardPile.length - 1].src}
        />
      )}
    </TouchableOpacity>
  );
};
