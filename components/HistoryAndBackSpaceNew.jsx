import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const RippleButtonContainer = ({ children, ripple, onPress }) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(
        "rgba(255,255,255,0.1)",
        true,
        ripple
      )}
    >
      {children}
    </TouchableNativeFeedback>
  );
};

const HistoryAndBackspaceNew = ({ history, dispatch, showHistory }) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: "row" }}>
        <View>
          <RippleButtonContainer
            ripple={40}
            onPress={() =>
              dispatch({
                type: "showHistory",
              })
            }
            disabled={history.length == 0}
          >
            <View style={{ width: wp(20)}}>
              {!showHistory ? (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="rgba(255,255,255,0.5)"
                  style={{height:hp(4)}}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </Svg>
              ) : (
                <Svg
                  xmlns="http://www.w3.org/2000/Svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="rgba(255,255,255,0.5)"
                  style={{height:hp(4)}}
                >
                  <Path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                  />
                </Svg>
              )}
            </View>
          </RippleButtonContainer>
        </View>
      </View>
      <View style={{ flex: 0.2 }}>
        <RippleButtonContainer
          ripple={40}
          onPress={() => dispatch({ type: "backspace" })}
        >
          <View>
            <Svg
              xmlns="http://www.w3.org/2000/Svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={0.8}
              stroke="#427e04"
              style={{height:hp(4)}}
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
              />
            </Svg>
          </View>
        </RippleButtonContainer>
      </View>
    </View>
  );
};

export default HistoryAndBackspaceNew;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    flexDirection: "row",
    width: "100%",
  },
});
