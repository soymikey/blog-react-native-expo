/* eslint-disable handle-callback-err */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,

  AsyncStorage
} from "react-native";

import { Input, Button, } from "react-native-elements";
import ModalComponent from './Modal.js'
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "../../utils/axios";
import alert from "../../utils/alert";
class PublishArticleScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: "发布",
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
  state = {
    title: "",
    content: " ",
    selectedCategoryIndex: 0,
    categoryList: [],
    selectedTagIndex: 0,
    tagList: [],
    Loading: false, // 发布的loading
    isLogin: null,
    isShowModal: false
  };
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

  async handlerPublish() {
    const { title, content, categoryList, tagList, selectedCategoryIndex, selectedTagIndex } = this.state;
    const params = {
      categories: [categoryList[selectedCategoryIndex].name],
      content,
      tags: [tagList[selectedTagIndex].name],
      title
    };

    this.setState({ Loading: true });
    axios
      .post("/article/create", params)
      .then(res => {
        alert("", res.message);
        this.setState({
          Loading: false,
          title: "",
          content: "",
          selectedCategoryIndex: 0,
          selectedTagIndex: 0
        });
      })
      .catch(err => {
        alert("请求错误", "登录信息过期或未授权，请重新登录！");
        this.setState({ Loading: false });
      });
  }
  async isLogin() {
    const hasLogin = await AsyncStorage.getItem("username");

    if (hasLogin !== null) {
      this.setState({ isLogin: true });
      return;
    }
    this.setState({ isLogin: false });
    return;
  }
  openModal() {
    this.setState({ isShowModal: true });
  }
  closeModal(value) {
    this.setState({ isShowModal: value });
  }
  setCategoryIndex(value) {
    this.setState({ selectedCategoryIndex: value })
  }
  setTagIndex(value) {
    this.setState({ selectedTagIndex: value })
  }
  render() {
    const {

      categoryList,
      tagList,
      Loading,

      isShowModal,
      selectedCategoryIndex,
      selectedTagIndex
    } = this.state;
    this.isLogin();
    return (
      <View>
        {isShowModal ? (
          <ModalComponent
            show={isShowModal}
            closeModal={this.closeModal.bind(this)}
            categoryList={categoryList}

            tagList={tagList}
            selectedCategoryIndex={selectedCategoryIndex}
            selectedTagIndex={selectedTagIndex}
            setCategoryIndex={this.setCategoryIndex.bind(this)}
            setTagIndex={this.setTagIndex.bind(this)}


          />
        ) : null}
        <Input
          leftIcon={<Text style={{ fontSize: 20 }}>文章标题：</Text>}
          placeholder=""
          onChangeText={title => this.setState({ title })}
          containerStyle={{ marginTop: 10, marginBottom: 10 }}
        />

        <View
          style={{
            margin: 10,
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: 'space-between'

          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                marginRight: 10
              }}
            >
              分类筛选:
            </Text>
            <Button
              title={categoryList.length ? categoryList[selectedCategoryIndex].name : ''}
              type="solid"
              onPress={() => this.openModal()}
            />


          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                marginRight: 10
              }}
            >
              标签筛选:
            </Text>
            <Button
              title={tagList.length ? tagList[selectedTagIndex].name : ''}

              type="solid"
              onPress={() => this.openModal()}
            />
          </View>
        </View>

        {/* <Input
          label={<Text style={{ marginTop: 10, fontSize: 20 }}>文章内容</Text>}
          multiline={true}
          numberOfLines={10}
          onChangeText={content => this.setState({ content })}
          value={this.state.content}
          editable={true}
          maxLength={180}
          inputContainerStyle={{
            backgroundColor: this.state.text,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 10
          }}
        /> */}

        <TextInput
          style={{ height: 250, borderColor: 'gray', borderWidth: 1,margin:10 }}
          onChangeText={content => this.setState({ content })}
          value={this.state.content}
        />
        <Button
          title={this.state.isLogin ? "发布" : "您还未登陆"}
          disabled={!this.state.isLogin}
          containerStyle={{ margin: 10, marginTop: 30 }}
          onPress={() => this.handlerPublish()}
          loading={Loading}
        />
      </View>
    );
  }
}

export default PublishArticleScreen;
