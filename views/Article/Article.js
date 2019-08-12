import React, { Component } from "react";

import { StyleSheet, ScrollView, View, Text } from "react-native";

import axios from "../../utils/axios";
import Loading from "../../components/Loading";
import ArticleList from "../../components/ArticleList";

class ArticleScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const articleName = navigation.getParam("articleName", "文章标题");
    return {
      headerTitle: articleName,
      headerStyle: {
        backgroundColor: "#2289DC",
        textAlign: "center"
      },

      headerTintColor: "#fff"
    };
  };
  state = {
    relatedArticleList: [],
    loading: false
  };
  componentDidMount() {
    console.log("article didmount");

    const categories = this.props.navigation.getParam("category", "Javascript");
    const firstCategory = categories[0];

    this.fetchRelatedArticle(1, firstCategory.name);
  }
  fetchRelatedArticle(page, name) {
    this.setState({ loading: true });

    axios
      .get("/categories/getArticles", { params: { page, pageSize: 15, name } })
      .then(res => {
        this.setState({ relatedArticleList: res.data, loading: false }, () => {
          console.log("相关文章请求成功", this.state.relatedArticleList);
        });
      })
      .catch(e => this.setState({ loading: false }));
  }
  componentDidUpdate() {
    if (this.scroll && this.scroll.scrollTo) {
      this.goToTop();
    }
  }
  goToTop = () => {
    setTimeout(() => {
      this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }, 300);
  };
  render() {
    const { navigation } = this.props;
    console.log("navigation", navigation);

    const { loading } = this.state;
    const content = navigation.getParam("content", "文章内容");

    const articleId = navigation.getParam("articleId", "文章id");
    const updatedAt = navigation.getParam("updatedAt", "发表日期");

    const { relatedArticleList } = this.state;
    return (
      <View style={styles.backgroundColor}>
        {/* <Text>{itemId}</Text>
        <Text>{title}</Text> */}
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            ref={c => {
              this.scroll = c;
            }}
          >
            <View style={styles.articleContainerStyle}>
              <Text style={styles.articleStyle}>{content}</Text>
              <View>
                <Text style={styles.publishTime}>
                  发布于:{updatedAt.slice(0, 10)}
                </Text>
              </View>
              <View>
                <Text style={styles.author}>作者:米高</Text>
              </View>
            </View>
            <ArticleList
              articlesList={relatedArticleList}
              navigation={this.props.navigation}
              title="相关文章"
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: "#EFEFEF",
    height: "100%"
  },
  articleContainerStyle: {
    padding: 10,
    backgroundColor: "#FFF",
    marginBottom: 20
  },
  articleStyle: {
    // color: "#BBBBBB",
    lineHeight: 20
  },
  publishTime: {
    color: "#BBBBBB",
    marginTop: 20
  },
  author: {
    color: "#BBBBBB",
    marginTop: 10
  },
  relatedAricleContainerStyle: {
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 10
  },
  titleContainer: {
    height: 40,
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: 1
  },
  title: {
    fontSize: 20,
    color: "#BBBBBB"
  },
  relatedArticleStyle: {
    borderBottomColor: "#BBBBBB",
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10
  },
  artitleTitle: {
    marginBottom: 10
  },
  artitleContent: {
    flexDirection: "row"
  },
  bottonTextStyle: {
    color: "#BBBBBB"
  }
});

export default ArticleScreen;
