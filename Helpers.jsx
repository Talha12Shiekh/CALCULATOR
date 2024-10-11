import { calculate, operators } from "./components/Calculation";


export function reducer(state, { type, payload }) {
    switch (type) {
      case "chooseDigit":
        if (payload.digit == "0" && state.currentOperand == "0") {
          return state;
        }

        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.digit,
            overwrite: false,
            green: false,
          };
        }
        if (
          payload.digit == "(" &&
          state.currentOperand.slice(-1) !== "" &&
          !operators.includes(state.currentOperand.slice(-1))
        ) {
          return {
            ...state,
            currentOperand: `${state.currentOperand}×${payload.digit}`,
            green: false,
          };
        }

        if (payload.digit == ")" && state.currentOperand == null) return state;

        if (payload.digit == ")" && !state.currentOperand.includes("("))
          return state;
        // if (payload.digit == '.' && state.currentOperand.includes('.')) {
        //   return state;
        // }
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
          previousOperand: calculate(state.currentOperand),
          green: false,
        };
      case "showHistory":
        return {
          ...state,
          showHistory: !state.showHistory,
        };

      case "clearHistory":
        return {
          ...state,
          showHistory: false,
          history: [],
        };
      case "chooseOperation":
        if (state.currentOperand == "") {
          return state;
        }

        if (
          !state.overwrite &&
          operators.includes(state.currentOperand.slice(-1))
        )
          return state;
        return {
          ...state,
          currentOperand: `${state.currentOperand}${payload.digit}`,
          overwrite: false,
          green: true,
        };
      case "showCalculations":
        return {
          ...state,
          currentOperand: state.currentOperand,
          previousOperand: calculate(state.currentOperand),
        };
      case "evaluation": {
        const historyObject = {
          currentOperand: state.currentOperand,
          previousOperand: state.previousOperand,
          key: Date.now().toString(),
        };
        return {
          ...state,
          history: [...state.history, historyObject],
          currentOperand: state.previousOperand,
          previousOperand: "",
          overwrite: true,
        };
      }
      case "showHistoryScreen": {
        const removeItems = payload.historyArray.filter((element) => {
          return element.key !== payload.key;
        });
        return {
          ...state,
          currentOperand: payload.currentOperand,
          showHistory: false,
          history: removeItems,
        };
      }
      case "backspace":
        if (state.currentOperand.length == 1) {
          return {
            ...state,
            currentOperand: "",
            green: false,
          };
        }
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: "",
          };
        }
        if (state.currentOperand == "") return state;
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1),
        };
      case "clear":
        return {
          ...state,
          currentOperand: "",
          previousOperand: "",
        };
    }
  }