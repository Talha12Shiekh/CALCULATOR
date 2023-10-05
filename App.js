import { useReducer, useEffect } from "react";
import Clockcircleo from "react-native-vector-icons/AntDesign";
import Backspace from "react-native-vector-icons/Ionicons";
import ButtonComponent from "./components/ButtonComponent";
import { calculate, operators } from "./components/Calculation";
import ButtonsLayout from "./components/Buttons";
import Sidebar from "./components/Sidebar";
import { Entypo } from "@expo/vector-icons";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import ButtonsData from "./components/ButtonData";
import * as SplashScreen from "expo-splash-screen";

const App = () => {
  let [fontsloaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const Greenoperators = [...operators, "(", ")"];

  function reducer(state, { type, payload }) {
    switch (type) {
      case "chooseDigit":
        if (payload.digit == "0" && state.currentOperand == "0") {
          return state;
        }

        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false,
            green: false,
          };
        }
        if (
          payload.digit == "(" &&
          state.currentOperand.slice(-1) !== "" &&
          !operators.includes(state.currentOperand.slice(-1))
        ) {
          return {
            ...state,
            currentOperand: `${state.currentOperand}×${payload.digit}`,
            green: false,
          };
        }

        if (payload.digit == ")" && state.currentOperand == null) return state;

        if (payload.digit == ")" && !state.currentOperand.includes("("))
          return state;
        // if (payload.digit == '.' && state.currentOperand.includes('.')) {
        //   return state;
        // }
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
          previousOperand: calculate(state.currentOperand),
          green: false,
        };
      case "showHistory":
        return {
          ...state,
          showHistory: !state.showHistory,
        };

      case "clearHistory":
        return {
          ...state,
          showHistory: false,
          history: [],
        };
      case "chooseOperation":
        if (state.currentOperand == "") {
          return state;
        }

        if (
          !state.overwrite &&
          operators.includes(state.currentOperand.slice(-1))
        )
          return state;
        return {
          ...state,
          currentOperand: `${state.currentOperand}${payload.digit}`,
          overwrite: false,
          green: true,
        };
      case "showCalculations":
        return {
          ...state,
          currentOperand: state.currentOperand,
          previousOperand: calculate(state.currentOperand),
        };
      case "evaluation": {
        const historyObject = {
          currentOperand: state.currentOperand,
          previousOperand: state.previousOperand,
          key: Date.now().toString(),
        };
        return {
          ...state,
          history: [...state.history, historyObject],
          currentOperand: state.previousOperand,
          previousOperand: "",
          overwrite: true,
        };
      }
      case "showHistoryScreen": {
        const removeItems = payload.historyArray.filter((element) => {
          return element.key !== payload.key;
        });
        return {
          ...state,
          currentOperand: payload.currentOperand,
          showHistory: false,
          history: removeItems,
        };
      }
      case "backspace":
        if (state.currentOperand.length == 1) {
          return {
            ...state,
            currentOperand: "",
            green: false,
          };
        }
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: "",
          };
        }
        if (state.currentOperand == "") return state;
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };
      case "clear":
        return {
          ...state,
          currentOperand: "",
          previousOperand: "",
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    currentOperand: "",
    previousOperand: "",
    history: [],
    showHistory: false,
  });

  if (!fontsloaded) {
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
      <View style={styles.screen}>
        <View style={{ height: 70 }}>
          <ScrollView>
            <Text
              style={{
                color: "white",
                fontSize: 50,
                fontFamily: "Nunito_600SemiBold",
              }}
              onTextLayout={() =>
                dispatch({
                  type: "showCalculations",
                })
              }
            >
              {typeof currentOperand === "string"
                ? state.currentOperand.split("").map((char, index) => {
                    return (
                      <Text
                        key={index}
                        style={{
                          color: Greenoperators.includes(char)
                            ? "#7fff00"
                            : "white",
                        }}
                      >
                        {char}
                      </Text>
                    );
                  })
                : currentOperand}
            </Text>
          </ScrollView>
        </View>
        <Text
          style={{
            color: "grey",
            fontSize: 30,
            fontWeight: "100",
            fontFamily: "Nunito_700Bold",
          }}
        >
          {previousOperand}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 15,
              width: 150,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                dispatch({
                  type: "showHistory",
                })
              }
              disabled={history.length == 0}
            >
              {!showHistory ? (
                <Clockcircleo
                  name="clockcircleo"
                  size={25}
                  style={{
                    fontWeight: 5,
                    color: history.length == 0 ? "grey" : "#fff",
                  }}
                />
              ) : (
                <Entypo
                  name="circle-with-cross"
                  size={30}
                  style={{
                    color: history.length == 0 ? "grey" : "#fff",
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Clockcircleo
                name="calculator"
                size={25}
                color="#fff"
                style={{ fontWeight: 5 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 40,
              aspectRatio: 1,
              position: "absolute",
              top: 15,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("white", true, 100)}
              onPress={() => dispatch({ type: "backspace" })}
            >
              <View>
                <Backspace
                  name="backspace-outline"
                  color="#427e04"
                  style={{ fontSize: 20 }}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
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
    height: "100%",
    position: "relative",
  },
  screen: {
    height: "40%",
    paddingTop: 45,
    paddingBottom: 12,
    borderBottomColor: "grey",
    borderWidth: 1,
    width: "90%",
    marginLeft: 14,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  backspace: {
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 50,
  },
});

export default App;
