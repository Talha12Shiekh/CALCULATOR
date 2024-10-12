import { View, FlatList } from "react-native";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ButtonComponent = ({ renderItemsFunction, dataOfButtns, columns }) => {
  return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: wp(2) }}>
    <FlatList
      numColumns={columns}
      data={dataOfButtns}
      key={(item) => item.digit}
      renderItem={renderItemsFunction}

    />
  </View>
}

export default ButtonComponent