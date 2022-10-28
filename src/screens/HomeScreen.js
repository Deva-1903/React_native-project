import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { firebase, auth, db } from "../config/firebase";
import { AntDesign } from "@expo/vector-icons";
import Post from "./Post";
import { POSTS } from "../../data/posts";
import Stories from "./Stories";
import Header from "./Header";

const handleSignout = async () => {
  try {
    await auth.signOut();
    console.log("Signed out");
  } catch (error) {
    console.log("Error");
  }
};

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collectionGroup("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })));
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "PieChips",
      headerStyle: { backgroundColor: "black" },
      headerTitleStyle: { color: "white" },
      headerTitleAlign: "center",
      headerTintColor: "black",
      headerRight: () => (
        <View>
          <TouchableOpacity onPress={handleSignout}>
            <AntDesign name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  // const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} navigation={navigation} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});

export default HomeScreen;
