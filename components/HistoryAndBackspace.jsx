import { View, TouchableOpacity, TouchableNativeFeedback } from "react-native";
import Clockcircleo from "react-native-vector-icons/AntDesign";
import Backspace from "react-native-vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

const IconContainer = ({ children }) => {
    return <View style={{flex:1, width: 50, aspectRatio: 1, justifyContent: "center", alignItems: "center"}}>
        {children}
    </View>
}

export default function HistoryAndBackspace({ history, dispatch, showHistory }) {

    const ICON_SIZE = 20;
    const ICON_COLOR = "rgba(255,255,255,.8)"

    return <View
        style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            padding: 10,
            flex: 0.8,
            // backgroundColor: "red",
            alignItems: "center"
        }}
    >
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: 80,
                justifyContent: "space-between",
                marginLeft: 10
            }}
        >
            <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
                "rgba(255,255,255,0.3)",
                false,
                20
            )}
                onPress={() =>
                    dispatch({
                        type: "showHistory",
                    })
                }
                disabled={history.length == 0}
            >
                {!showHistory ? (
                    <IconContainer>
                        <Clockcircleo
                            name="clockcircleo"
                            size={ICON_SIZE}
                            style={{
                                color: ICON_COLOR,
                            }}
                        />
                    </IconContainer>
                ) : (
                    <IconContainer>
                        <Entypo
                            name="circle-with-cross"
                            size={ICON_SIZE}
                            style={{
                                color: ICON_COLOR,
                            }}
                        />
                    </IconContainer>
                )}
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                    "rgba(255,255,255,0.3)",
                    false,
                    40
                )}
            >
                <IconContainer>
                    <Clockcircleo
                        name="calculator"
                        size={ICON_SIZE}
                        color={ICON_COLOR}
                        style={{ fontWeight: 5 }}
                    />
                </IconContainer>
            </TouchableNativeFeedback>
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
}