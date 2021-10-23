import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 450,
    maxWidth: "95vw",
  },
  episode: {
    margin: "20px",
    border: "1px solid black",
    maxWidth: "95vw",
  },
  textContainer: {
    margin: 10,
  },
});

type Movie = {
  episode: {
    title: string;
    episode_number: string;
    hero_image: string;
  };
};

const Episode = ({ episode: { title, episode_number, hero_image } }: Movie) => {
  return (
    <>
      <View style={styles.episode}>
        <Image
          source={require(`../assets/images/${hero_image}`)}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text>
            <strong>Title:</strong> {title}
          </Text>
          <Text>
            <strong>Episode number:</strong> {episode_number}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Episode;
