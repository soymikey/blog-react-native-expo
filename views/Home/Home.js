/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  RefreshControl
} from "react-native";

import { ListItem, Image } from "react-native-elements";
import Loading from "../../components/Loading";
import ModalComponent from "./childComponents/Modal";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "../../utils/axios";

const { width, height } = Dimensions.get("window");
class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: "首页",
      headerStyle: {
        backgroundColor: "#2289DC",
        textAlign: "center"
      },

      headerTintColor: "#fff",
      headerLeft: (
        <TouchableOpacity onPress={() => params.handleOpenModal()}>
          <Icon style={{ marginLeft: 20 }} name="bars" color="#fff" size={20} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search");
          }}
        >
          <Icon
            style={{ marginRight: 20 }}
            name="search"
            color="#fff"
            size={20}
          />
        </TouchableOpacity>
      )
    };
  };
  state = {
    loading: false,
    list: [],
    isShowModal: false,
    refreshing: false
  };
  componentDidMount() {
    this.fetchList({ page: 1, keyword: "", category: "", tag: "" });
    this.props.navigation.setParams({
      handleOpenModal: this.openModal.bind(this)
    });
  }
  fetchList({ page, keyword, category, tag }) {
    this.setState({ loading: true });

    axios
      .get("/article/getList", {
        params: { page, pageSize: 20, title: keyword, category, tag }
      })
      .then(res => {
        const list = res.data;

        this.setState({ list, loading: false, refreshing: false }, () => {
          console.log("文章请求成功", this.state);
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }
  filterArticle(categoryKeyWord, tagKeyWord) {
    ///article/getList
    this.fetchList({
      page: 1,
      keyword: "",
      category: categoryKeyWord,
      tag: tagKeyWord
    });
  }
  openModal() {
    this.setState({ isShowModal: true });
  }
  closeModal(value) {
    this.setState({ isShowModal: value });
  }
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchList({ page: 1, keyword: "", category: "", tag: "" });
  };

  render() {
    const { list, loading, isShowModal } = this.state;
    return (
      <View style={styles.backgroundColor}>
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            {isShowModal ? (
              <ModalComponent
                show={isShowModal}
                closeModal={this.closeModal.bind(this)}
                filterArticle={this.filterArticle.bind(this)}
              />
            ) : <View></View>}
            {/* <ModalComponent
                show={isShowModal}
                closeModal={this.closeModal.bind(this)}
                filterArticle={this.filterArticle.bind(this)}
              /> */}
            {list.length ? (
              list.map((article, i) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Article", {
                      articleName: article.title,
                      articleId: article.id,
                      content: article.content,
                      updatedAt: article.updatedAt,
                      category: article.categories
                    })
                  }
                  key={i}
                >
                  <ListItem
                    style={styles.ListItem}
                    subtitle={
                      <View>
                        <Image
                          source={{ uri: article.img_url }}
                          style={styles.imageStyle}
                        />
                        <Text style={styles.titleStyle}>{article.title}</Text>
                        {/* <Text style={styles.contentStyle}>
                        {article.subtitle}
                      </Text> */}
                        <View style={styles.footerStyle}>
                          <Text style={styles.dateStyle}>
                            <Icon name="clock-o" size={20} color="#BBBBBB" />
                            &nbsp;&nbsp;发布于:{article.createdAt.slice(0, 10)}
                          </Text>
                          <Text style={styles.viewStyle}>
                            <Icon name="eye" size={20} color="#BBBBBB" />
                            &nbsp;&nbsp;3242
                          </Text>
                          <Text style={styles.commentStyle}>
                            <Icon name="comment-o" size={20} color="#BBBBBB" />
                            &nbsp;&nbsp;11
                          </Text>
                          <Text style={styles.likeStyle}>
                            <Icon name="heart-o" size={20} color="#BBBBBB" />
                            &nbsp;&nbsp;36
                          </Text>
                        </View>
                      </View>
                    }
                    // leftAvatar={{
                    //   source: { uri: article.avatar_url },
                    //   showEditButton: true
                    // }}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noMoreTextContainerStyle}>
                <Text style={styles.noMoreTextStyle}>
                  没有找到你想要的文章~~
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: "#EFEFEF",
    height: height
  },
  ListItem: {
    marginTop: 20
  },
  imageStyle: {
    width: "100%",
    height: 150
  },
  titleStyle: {
    fontWeight: "bold",
    marginTop: 20
  },
  contentStyle: {
    marginTop: 10,
    marginBottom: 10,
    color: "#BBBBBB"
  },
  footerStyle: {
    marginTop: 10,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  },
  dateStyle: {
    flex: 2,
    color: "#BBBBBB"
  },
  viewStyle: {
    flex: 1,

    color: "#BBBBBB"
  },
  commentStyle: { flex: 1, color: "#BBBBBB" },
  likeStyle: { flex: 1, color: "#BBBBBB" },
  noMoreTextContainerStyle: {
    height: height,
    alignItems: "center",
    justifyContent: "center"
  },
  noMoreTextStyle: {
    fontSize: 25
  }
});
export default HomeScreen;
