import { View, FlatList } from "react-native";

const ButtonComponent = ({ renderItemsFunction, dataOfButtns, columns }) => {
  return <View style={{ paddingVertical: 10, paddingHorizontal: 5, flex: 1 }}>
    <FlatList
      numColumns={columns}
      data={dataOfButtns}
      key={(item) => item.digit}
      renderItem={renderItemsFunction}
      ItemSeparatorComponent={() => (
        <View style={{ marginRight: 3, width: 5, height: 5 }}></View>
      )}
    />
  </View>
}

export default ButtonComponent