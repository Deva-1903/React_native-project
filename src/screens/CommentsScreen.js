import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Divider } from "react-native-elements";

const CommentsScreen = ({ navigation, post }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Comments",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerTitleAlign: "right",
    });
  });
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 5,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://1480864561.rsc.cdn77.org/assets/news_images/-Superstar-Rajinikanth-s-11-best-performances-that-deserve-much-bigger-appreciation-Here-s-the-list-_1644407282.jpg",
            }}
            style={styles.story}
          />
          <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
            rajinikanth
          </Text>
          <Text> "Cool😎"</Text>
        </View>
      </View>
      <Divider
        style={{ margin: 10, width: "1000%", color: "#2089dc" }}
        orientation="vertical"
      />

      <ScrollView></ScrollView>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  footer: {
    bottom: -600,
  },
  TextInput: {},
});
