/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Text
} from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "../../../utils/axios";

// import Separator from "./Separator";

const { width, height } = Dimensions.get("window");
const dialogH = height - 80;
class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.show,
      categoryList: [],
      tagList: [],
      selectedCategory: ""
    };
  }
  componentDidMount() {
    this.fetchCategories();
    this.fetchTags();    
  }

  fetchCategories() {
    axios.get("/categories/getList").then(res => {
      const formatedData = res.data.map(category => {
        category.selected = false;

        return category;
      });
      this.setState({ categoryList: formatedData });
    });
  }
  fetchTags() {
    axios.get("/tags/getList").then(res => {
      const formatedData = res.data.map(tag => {
        tag.selected = false;

        return tag;
      });
      this.setState({ tagList: formatedData });
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isVisible: nextProps.show });
  }

  closeModal() {
    this.setState({
      isVisible: false
    });
    this.props.closeModal(false);
  }
  selectCategory(value) {
    const newCategoryList = this.state.categoryList.map(category => {
      if (category.name === value.name) {
        category.selected = !category.selected;
        return category;
      } else {
        category.selected = false;
      }
      return category;
    });
    this.setState({ categoryList: newCategoryList });
  }
  selectTag(value) {
    const newTagList = this.state.tagList.map(tag => {
      if (tag.name === value.name) {
        tag.selected = !tag.selected;
        return tag;
      } else {
        tag.selected = false;
      }
      return tag;
    });
    this.setState({ tagList: newTagList });
  }
  resetFilter() {
    const { categoryList, tagList } = this.state;
    const newCategoryList = categoryList.map(category => {
      if (category.selected) {
        category.selected = false;
        return category;
      }
      return category;
    });
    const newTagList = tagList.map(tag => {
      if (tag.selected) {
        tag.selected = false;
        return tag;
      }
      return tag;
    });
    this.setState(
      {
        categoryList: newCategoryList,
        tagList: newTagList
      }
      // () => {
      //   this.props.filterArticle("", "");
      //   this.closeModal();
      // }
    );
  }
  filterHandler() {
    const { categoryList, tagList } = this.state;
    let categoryKeyWord = "";
    let tagKeyWord = "";
    for (const category of categoryList) {
      if (category.selected) {
        categoryKeyWord = category.name;
      }
    }
    for (const tag of tagList) {
      if (tag.selected) {
        tagKeyWord = tag.name;
      }
    }
    this.props.filterArticle(categoryKeyWord, tagKeyWord);

    this.closeModal();
  }

  render() {
    const { categoryList, tagList } = this.state;


    return (
      <View style={{ flex: 1 }}>
        <Modal
          transparent={true}
          visible={this.state.isVisible}
          animationType={"fade"}
          onRequestClose={() => this.closeModal()}
        >
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <View style={styles.modalStyle}>
              <Text style={styles.text}>使用标签,分类进行过滤</Text>
              <Icon
                style={styles.closeIconStyle}
                name="close"
                color="#808080"
                size={20}
                onPress={() => this.closeModal()}
              />
              <View style={styles.borderStyle} />
              <ScrollView style={{ padding: 20, paddingTop: 0 }}>
                <View>
                  <Text style={styles.categoryTitleStyle}>分类</Text>
                  <View style={styles.buttonContainerStyle}>
                    {categoryList.length ? (
                      categoryList.map((category, index) => {
                        return (
                          <Button
                            key={index}
                            onPress={() => this.selectCategory(category)}
                            buttonStyle={{
                              margin: 5
                            }}
                            title={category.name}
                            type={category.selected ? "solid" : "outline"}
                          />
                        );
                      })
                    ) : (
                      <View />
                    )}
                  </View>
                </View>
                <View>
                  <Text style={styles.categoryTitleStyle}>标签</Text>
                  <View style={styles.buttonContainerStyle}>
                    {tagList.length ? (
                      tagList.map((tag, index) => {
                        return (
                          <Button
                            key={index}
                            onPress={() => this.selectTag(tag)}
                            buttonStyle={{
                              margin: 5
                            }}
                            title={tag.name}
                            type={tag.selected ? "solid" : "outline"}
                          />
                        );
                      })
                    ) : (
                      <View />
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-around"
                  }}
                >
                  <Button
                    containerStyle={{ marginTop: 50 }}
                    buttonStyle={{ backgroundColor: "red" }}
                    title="重置"
                    onPress={() => {
                      this.resetFilter();
                    }}
                  />
                  <Button
                    containerStyle={{ marginTop: 50 }}
                    title="筛选"
                    onPress={() => {
                      this.filterHandler();
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalStyle: {
    position: "absolute",
    top: 250,
    left: 0,
    width: width,
    height: dialogH,
    backgroundColor: "#ffffff"
  },

  text: {
    fontSize: 18,
    margin: 10,
    justifyContent: "center",
    alignSelf: "center"
  },
  closeIconStyle: {
    position: "absolute",
    top: 10,
    right: 10
  },
  borderStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#BBBBBB"
  },
  categoryTitleStyle: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: 20
  },
  buttonContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default ModalComponent;
