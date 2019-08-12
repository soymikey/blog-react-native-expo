import React, { Component } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";

const screenHeight = Dimensions.get("window").height;
class Loading extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <View>
          <ActivityIndicator size="large" color="#BBBBBB" />
          <Text style={styles.loadingTextStyle}>拼命加载中...</Text>
        </View>

        {/* <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: screenHeight / 2 - 80
  },
  loadingTextStyle: {
    textAlign: "center",
    marginTop: 10
  }
});

export default Loading;
