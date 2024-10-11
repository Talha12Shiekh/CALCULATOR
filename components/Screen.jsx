import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import { operators } from "./Calculation";
import HistoryAndBackspaceNew from "./HistoryAndBackSpaceNew"; 

const Greenoperators = [...operators, "(", ")"];

export default function Screen({ currentOperand, dispatch, state, previousOperand, history, showHistory }) {
    return (
        <View style={styles.screen}>
            <View style={{ flex: 1.5, padding: 30, paddingTop: 50, paddingBottom: 10 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 40,
                            fontFamily: "Poppins_300Light",
                        }}
                        onTextLayout={() =>
                            dispatch({
                                type: "showCalculations",
                            })
                        }
                    >
                        {typeof currentOperand === "string"
                            ? state.currentOperand.split("").map((char, index) => {
                                return (
                                    <Text
                                        key={index}
                                        style={{
                                            color: Greenoperators.includes(char)
                                                ? "#7fff00"
                                                : "white",
                                        }}
                                    >
                                        {char}
                                    </Text>
                                );
                            })
                            : currentOperand}
                    </Text>
                </ScrollView>
            </View>
            <View style={{ flex: 0.5, padding: 30 }}>
                <Text
                    style={{
                        color: "grey",
                        fontSize: 30,
                        fontFamily: "Poppins_300Light",
                    }}
                >
                    {previousOperand}
                </Text>
            </View>
            <HistoryAndBackspaceNew
                history={history}
                dispatch={dispatch}
                showHistory={showHistory}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        borderBottomColor: "grey",
        borderWidth: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flex: 0.7,
    },
    backspace: {
        height: 40,
        width: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 50,
    },
});
