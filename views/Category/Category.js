import React, { Fragment } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from "react-native";

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";
import {
  Button,
  ThemeProvider,
  Header,
  ListItem,
  Image
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

class CategoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: "垃圾分类",
      headerStyle: {
        backgroundColor: "#2289DC",
        textAlign: "center"
      },

      headerTintColor: "#fff",
      headerLeft: (
        <TouchableOpacity onPress={() => params.handleOpenModal()}>
          <Icon
            style={{ marginLeft: 20 }}
            name="file-text"
            color="#fff"
            size={20}
          />
        </TouchableOpacity>
      )
    };
  };
  state = { itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
  render() {
    return (
      <View>
        <Text style={{ fontSize: 40, fontWeight: "bold", textAlign: "center" }}>
          垃圾分类
        </Text>
        <Text>
          垃圾分类，指按一定规定或标准将垃圾分类储存、分类投放和分类搬运，从而转变成公共资源的一系列活动的总称。
          ...
          垃圾在分类储存阶段属于公众的私有品，垃圾经公众分类投放后成为公众所在小区或社区的区域性准公共资源，垃圾分类搬运到垃圾集中点或转运站后成为没有排除性的公共资源。
          ... 2019年6月25日，生活垃圾分类制度将入法。
        </Text>
      </View>
    );
  }
}

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

export default CategoryScreen;
