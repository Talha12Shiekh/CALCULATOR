import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {RippleButtonContainer} from "./HistoryAndBackSpaceNew";

const ButtonsLayout = ({ item, handleCalulations, showHistory }) => {
  return (
    <RippleButtonContainer
      ripple={45}
      onPress={() => handleCalulations(item.type, item.digit)}
    >
      <View style={[styles.button, { backgroundColor: item.backgroundColor }]}>
        <Text
          style={[
            styles.buttonText,
            {
              color: item.color,
            },
          ]}
        >
          {item.digit}
        </Text>
      </View>
    </RippleButtonContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: hp(.6),
    width: wp(22),
    height:hp(10.3),
    borderRadius: 100,
    justifyContent:"center",
    alignItems:"center"
  },
  buttonText: {
    fontSize: hp(3.3),
    fontFamily: "Poppins_400Regular",
    marginTop:hp(1)
  },
});

export default ButtonsLayout;
