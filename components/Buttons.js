import { TouchableOpacity, View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

const ButtonsLayout = ({ item, handleCalulations,showHistory }) => {
  return (
    <View style={styles.buttnContainer}>
      <TouchableNativeFeedback
        disabled={showHistory}
        background={TouchableNativeFeedback.Ripple("white",true,40)}
        onPress={() => handleCalulations(item.type, item.digit)}
        style={[
          styles.button,
        ]}>
          <View style={{width:85,aspectRatio:1,backgroundColor:item.backgroundColor,borderRadius:50,justifyContent:"center",alignItems:'center',margin:5}}>
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
  buttnContainer: {
    width: 100,
    height: '240%',
  },
  button: {
    width: 80,
    borderRadius: 50,
    height: undefined,
    margin: 4,
    aspectRatio: 1,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 35,
  },
});

export default ButtonsLayout;
