import { TouchableOpacity, View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

const ButtonsLayout = ({ item, handleCalulations,showHistory }) => {
  return (
    <View>
      <TouchableNativeFeedback
        disabled={showHistory}
        background={TouchableNativeFeedback.Ripple("white",true,40)}
        onPress={() => handleCalulations(item.type, item.digit)}
       >
          <View style={[styles.button,{backgroundColor:item.backgroundColor}]}>
        <Text
          style={[
            styles.buttonText,
            {
              color: item.color,
            },
          ]}>
          {item.digit}
          <Text>{item.operation}</Text>
        </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  button:{backgroundColor:"red",margin:5,width:85,height:85,alignSelf:"center",alignItems:"center",justifyContent:"center",borderRadius:50},
  buttonText:{fontFamily: "Poppins_500Medium",fontSize:35}
});

export default ButtonsLayout;
