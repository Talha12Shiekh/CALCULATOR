import { useReducer, useEffect } from "react";
import ButtonComponent from "./components/ButtonComponent";

import ButtonsLayout from "./components/Buttons";
import Sidebar from "./components/Sidebar";
import Screen from "./components/Screen";
import { reducer } from "./Helpers.jsx";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { View, StyleSheet } from "react-native";
import ButtonsData from "./components/ButtonData";
import * as SplashScreen from "expo-splash-screen";

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    currentOperand: "",
    previousOperand: "",
    history: [],
    showHistory: false,
  });

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const handleCalulations = (type, digit) => {
    dispatch({ type: type, payload: { digit } });
  };

  const { currentOperand, previousOperand, history, showHistory } = state;
  const renderButtons = ({ item }) => {
    return (
      <ButtonsLayout
        item={item}
        showHistory={showHistory}
        handleCalulations={handleCalulations}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Sidebar
        showHistory={showHistory}
        history={history}
        dispatch={dispatch}
      />
      <Screen
        currentOperand={currentOperand}
        dispatch={dispatch}
        state={state}
        previousOperand={previousOperand}
        history={history}
        showHistory={showHistory}
      />
      <ButtonComponent
        renderItemsFunction={renderButtons}
        key={(item) => item.digit}
        dataOfButtns={ButtonsData}
        columns={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#010101",
    flex: 1,
    position: "relative",
  },
});

export default App;
