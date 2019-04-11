import React, { Component } from "react";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../../services/api";

import styles from "./styles";

export default class Main extends Component {
  state = {
    newBox: ""
  };

  async componentDidMount() {
    const box = await AsyncStorage.getItem("@WBox:box");

    if (box) {
      this.props.navigation.navigate("Box");
    }
  }

  handleSignIn = async () => {
    const response = await api.post("boxes", {
      title: this.state.newBox
    });

    await AsyncStorage.setItem("@WBox:box", response.data._id);

    if (response) {
      console.log(response);
    }

    this.props.navigation.navigate("Box");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>WBox</Text>

        <TextInput
          style={styles.input}
          placeholder="Create a box"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          value={this.state.newBox}
          onChangeText={text => this.setState({ newBox: text })}
        />

        <TouchableOpacity onPress={this.handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
