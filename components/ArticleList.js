import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

class ArticleList extends Component {
  render() {
    console.log("articlesList", this.props.articlesList);

    return (
      <View style={styles.relatedAricleContainerStyle}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        {this.props.articlesList.length ? (
          this.props.articlesList.map((relatedArticle, index) => {
            return (
              <TouchableOpacity
                style={styles.relatedArticleStyle}
                key={index}
                onPress={() => {
                  this.props.navigation.navigate("Article", {
                    articleName: relatedArticle.title,
                    articleId: relatedArticle.id,
                    content: relatedArticle.content,
                    updatedAt: relatedArticle.updatedAt,
                    category: relatedArticle.categories
                  });
                }}
              >
                <Text style={styles.artitleTitle}>{relatedArticle.title}</Text>
                <View style={styles.artitleContent}>
                  <Text style={styles.bottonTextStyle}>阅读:342</Text>
                  <Text style={styles.bottonTextStyle}>
                    &nbsp;&nbsp;喜欢:13
                  </Text>
                  <Text style={styles.bottonTextStyle}>
                    &nbsp;&nbsp;评论:42
                  </Text>
                  <Text style={styles.bottonTextStyle}>
                    &nbsp;&nbsp;发布于:
                    {relatedArticle.updatedAt.slice(0, 10)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  relatedAricleContainerStyle: {
    // marginTop: 20,
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

export default ArticleList;
