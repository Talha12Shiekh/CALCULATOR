import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import { operators } from "./Calculation";
import HistoryAndBackspaceNew from "./HistoryAndBackSpaceNew";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Greenoperators = [...operators, "(", ")"];

export default function Screen({ currentOperand, dispatch, state, previousOperand, history, showHistory }) {
    return (
        <View style={styles.screen}>
            <View style={{ flex: 1.5, padding: wp(8), paddingTop: hp(5), paddingBottom: hp(1)}}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: hp(5),
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
            <View style={{ flex: 0.5, padding: wp(8) }}>
                <Text
                    style={{
                        color: "grey",
                        fontSize: hp(3),
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
    }
});
