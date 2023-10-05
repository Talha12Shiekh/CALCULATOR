import { useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableNativeFeedback,
} from "react-native";

const Sidebar = ({ showHistory, history, dispatch }) => {
  const leftAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!showHistory) {
      Animated.timing(leftAnimation, {
        toValue: -280,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(leftAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [showHistory]);

  return (
    <Animated.View
      style={[
        styles.sidebar,
        {
          left: leftAnimation,
        },
      ]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
          height: "80%",
        }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          {history.map((element) => {
            return (
              <TouchableNativeFeedback
                key={element.key}
                background={TouchableNativeFeedback.Ripple("white", false)}
                style={{
                  color: "black",
                  fontWeight: "bold",
                  borderBottomColor: "white",
                  borderBottomWidth: 1,
                  marginVertical: 5,
                  marginHorizontal: 9,
                }}
                onPress={() =>
                  dispatch({
                    type: "showHistoryScreen",
                    payload: {
                      key: element.key,
                      currentOperand: element.currentOperand,
                      historyArray: history,
                    },
                  })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: "grey",
                    width: "100%",
                    overflow: "scroll",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 30,
                      fontFamily: "Nunito_600SemiBold",
                    }}
                  >
                    {element.currentOperand}
                  </Text>
                  <Text
                    style={{
                      color: "#7fff00",
                      fontSize: 30,
                      fontFamily: "Nunito_600SemiBold",
                    }}
                  >
                    {""} = {element.previousOperand}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{
          width: "90%",
          backgroundColor: "#171717",
          padding: 5,
          marginLeft: 10,
          position: "relative",
          bottom: -30,
          zIndex: -1,
        }}
        onPress={() =>
          dispatch({
            type: "clearHistory",
          })
        }
        disabled={history.length == 0}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            backgroundColor: "#4d4d4d",
            padding: 10,
            borderRadius: 25,
            fontWeight: "bold",
          }}
        >
          Clear history
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: "#171717",
    height: "60%",
    width: 280,
    position: "absolute",
    top: 345,
    zIndex: 2222,
  },
});

export default Sidebar;
