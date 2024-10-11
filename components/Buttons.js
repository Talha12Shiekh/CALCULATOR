import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

const ButtonsLayout = ({ item, handleCalulations, showHistory }) => {
  return (
    <TouchableNativeFeedback
      disabled={showHistory}
      background={TouchableNativeFeedback.Ripple(
        "rgba(255,255,255,0.1)",
        true,
        40
      )}
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
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    width: 85,
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent:"center",
    alignItems:"center"
  },
  buttonText: {
    fontSize: 25,
    fontFamily: "Poppins_400Regular",
    marginTop:5
  },
});

export default ButtonsLayout;
