import React, { Fragment } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

const TestScreen = () => {
  state = { itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.flexContainer}>
            {this.state.itemList.map((item, index) => {
              return (
                <View
                  style={
                    index % 3 == 0
                      ? styles.flexItemWithLeftBorder
                      : styles.flexItem
                  }
                  key={index}
                >
                  <Text style={styles.flexItemContent}>{item}</Text>
                </View>
              );
            })}
          </View>
          {/* <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step </Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  flexContainer: {
    flexWrap: "wrap",
    flexDirection: "row"
    // alignContent:'center',
    // justifyContent:'center'
  },
  flexItem: {
    width: "33.33%",
    height: 100,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: "white"
  },
  flexItemWithLeftBorder: {
    width: "33.33%",
    height: 100,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    backgroundColor: "white"
  },
  flexItemContent: {
    textAlign: "center",
    lineHeight: 100
  }
});

export default TestScreen;
