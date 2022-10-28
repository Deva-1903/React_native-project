import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Image } from "react-native-elements";

import InputField from "../../components/InputField";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import GoogleSVG from "../../assets/socials/google.svg";
import FacebookSVG from "../../assets/socials/facebook.svg";
import TwitterSVG from "../../assets/socials/twitter.svg";
import CustomButton from "../../components/CustomButton";

import { auth, db } from "../config/firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password, name, phone)
      .then((authUser) => {
        db.collection("users").doc(authUser.user.email).set({
          owner_uid: authUser.user.uid,
          name: name,
          email: authUser.user.email,
          phone: phone,
        });
        authUser.user.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => Alert.alert(error.message));
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}
      >
        <View style={{ alignItems: "center", padding: 22 }}>
          <Image
            source={require("../../assets/Piechips.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <TwitterSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
          Or, register with email ...
        </Text>

        <InputField
          label={"Full Name"}
          value={name}
          onChangeText={(text) => setName(text)}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
        />

        <InputField
          label={"Email ID"}
          value={email}
          onChangeText={(text) => setEmail(text)}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={"Password"}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <InputField
          label={"Phone Number"}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          icon={
            <Ionicons
              name="ios-call-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          onSubmitEditing={register}
        />

        <CustomButton label={"Register"} onPress={register} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "#2146C7", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
