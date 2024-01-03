import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import CurrencyBtn from './components/CurrencyBtn';
import { currencyByRupee } from './constants';
import Snackbar from 'react-native-snackbar';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

// Optional configuration
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};


function App(): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const btnPress = (targetValue: Currency) => {
    if (!inputValue) {
      ReactNativeHapticFeedback.trigger("notificationWarning", options);
      return Snackbar.show({
        text: "Please Enter Some Amount",
        backgroundColor: "red",
        textColor: "white"
      })
    }
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      ReactNativeHapticFeedback.trigger("impactLight", options);
      const convertedValue = inputAmount * targetValue.value
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`
      setResultValue(result)
      setTargetCurrency(targetValue.name)
    }
    else {
      ReactNativeHapticFeedback.trigger("notificationWarning", options);
      return Snackbar.show({
        text: "Not a Valid Number To Convert",
        backgroundColor: "red",
        textColor: "white"
      })
    }
  }
  return (
    <>
      <StatusBar backgroundColor="#e2e2e2" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.heading}>Currency Converter</Text>
          <View style={styles.topContainer}>
            <View style={styles.rupeeContainer}>
              <Text style={styles.rupee}>₹</Text>
              <TextInput placeholderTextColor="black" placeholder='Enter Amount in Rupees' maxLength={14} value={inputValue}
                onChangeText={setInputValue}
                keyboardType='number-pad'
                style={styles.inputText}
              />
            </View>
            {resultValue && (
              <Text style={styles.resultValue} selectable={true} >{resultValue}</Text>
            )}
          </View>
          <View style={styles.bottomContainer}>
            <FlatList
              numColumns={3}
              data={currencyByRupee}
              keyExtractor={item => item.name}
              renderItem={({ item }) => (
                <Pressable style={[styles.btn, targetCurrency === item.name && styles.selected]}
                  onPress={() => btnPress(item)}
                >
                  <CurrencyBtn {...item} />
                </Pressable>
              )}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e2e2"
  },
  mainContainer: {
    margin: 10,
  },
  heading: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30
  },
  topContainer: {
    margin: 10,
  },
  rupeeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10
  },
  rupee: {
    color: "#605f5e",
    fontSize: 30,
    fontWeight: "bold",
  },
  inputText: {
    borderColor: "#605f5e",
    borderWidth: 1,
    borderRadius: 20,
    padding: 13,
    marginLeft: 10,
    width: "90%"
  },
  resultValue: {
    color: "white",
    fontSize: 30,
    marginHorizontal: 70,
    marginVertical: 30,
    backgroundColor: "#fb3640",
    borderRadius: 20,
    padding: 10,
    width: "auto",
    textAlign: "center"
  },
  bottomContainer: {
    margin: 5,
    // justifyContent:"space-evenly",
  },
  btn: {
    padding: 20,
    backgroundColor: "#0a2463",
    borderRadius: 10,
    margin: 10,
    width: "28%",
  },
  selected: {
    backgroundColor: '#fb3640'
  }
});

export default App;
