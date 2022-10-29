import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";

import { EvilIcons, Ionicons } from "@expo/vector-icons";

import { auth, db } from "../config/firebase";
import firebase from "firebase/compat/app";

import { TextInput } from "react-native-gesture-handler";
const postFooterIcons = [
  {
    name: "Like",
    imageUrl:
      "https://img.icons8.com/material-outlined/48/FFFFFF/filled-like.png",
    likedimageUrl: "https://img.icons8.com/color/48/000000/filled-like.png",
  },
  {
    name: "Comment",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/2462/2462719.png",
  },
  {
    name: "Share",
    imageUrl: "https://img.icons8.com/ios/100/FFFFFF/sent.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/pastel-glyph/64/FFFFFF/bookmark-ribbon.png",
  },
];

const Post = ({ post, navigation }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.liked_by_users.includes(
      auth.currentUser.email
    );

    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        liked_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      });
  };

  const postComment = () => {
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(typecomment),
      });
  };

  const [typecomment, setTypecomment] = useState("");

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 7, marginTop: 10 }}>
        <PostFooter
          handleLike={handleLike}
          post={post}
          navigation={navigation}
        />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
        <TypeComment
          typecomment={typecomment}
          setTypecomment={setTypecomment}
          postComment={postComment}
        />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View
    style={{
      width: "100%",
      height: 450,
    }}
  >
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ navigation, handleLike, post }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.leftFooterIconsContainer}>
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            style={styles.footerIcon}
            source={{
              uri: post.liked_by_users.includes(auth.currentUser.email)
                ? postFooterIcons[0].likedimageUrl
                : postFooterIcons[0].imageUrl,
            }}
          />
        </TouchableOpacity>

        <View>
          <TouchableOpacity>
            <EvilIcons name="comment" size={34} color="white" />
          </TouchableOpacity>
        </View>

        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[2].imageUrl}
        />
      </View>
      <View style={{ alignItems: "flex-end", flex: 1 }}>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[3].imageUrl}
        />
      </View>
    </View>
  );
};

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.liked_by_users.length
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
      likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "700" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        View{post.comments.length > 1 ? " all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const TypeComment = ({ postComment, typecomment, setTypecomment }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <View styles={styles.commentFooter}>
            <TextInput
              value={typecomment}
              onChangeText={(text) => setTypecomment(text)}
              placeholder="Post a comment"
              style={styles.textInput}
              onSubmitEditing={postComment}
            />
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const Comments = ({ post }) => (
  <View>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "600" }}>
            {auth.currentUser.displayName}
          </Text>{" "}
          {comment}
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 27,
    height: 27,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "30%",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
  },
  commentFooter: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 35,
    flex: 1,
    marginRight: -1,
    borderColor: "transparent",
    backgroundColor: "gray",
    borderWidth: 4,
    padding: 9,
    color: "white",
    borderRadius: 13.5,
  },
  icon: {
    // flexDirection: "row",
    bottom: 0,
    alignItems: "center",
    //width: "100%",
    padding: 12,
  },
});

export default Post;
