import { useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableNativeFeedback,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Sidebar = ({ showHistory, history, dispatch }) => {
  const leftAnimation = useRef(new Animated.Value(0)).current;

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!showHistory) {
      Animated.timing(leftAnimation, {
        toValue: -width,
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
    <>
      {showHistory && (
        <TouchableWithoutFeedback
          onPress={() =>
            dispatch({
              type: "showHistory",
            })
          }
        >
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}
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
            height: hp(54),
          }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: hp(2) }}>
            {history.map((element) => {
              return (
                <TouchableNativeFeedback
                  key={element.key}
                  background={TouchableNativeFeedback.Ripple("white", false)}
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
                      marginLeft: wp(2),
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: "grey",
                      width: "100%",
                      overflow: "scroll",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: wp(7),
                      }}
                    >
                      {element.currentOperand}
                    </Text>
                    <Text
                      style={{
                        color: "#7fff00",
                        fontSize: wp(7),
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
        <View style={{position:"absolute",bottom:0,right:0,left:0}}>
         
        <TouchableOpacity
          style={{
            width: "90%",
            backgroundColor: "#171717",
            padding: wp(2),
            alignSelf: "center",
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
              padding: hp(1.3),
              borderRadius: 25,
              fontWeight: "bold",
            }}
          >
            Clear history
          </Text>
        </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: "#171717",
    height:hp(62),
    width: wp(70),
    position: "absolute",
    zIndex: 2222,
    bottom: 0,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: 222,
    backgroundColor:"rgba(0,0,0,.3)",
  },
});

export default Sidebar;
