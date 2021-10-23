import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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

interface EpisodeProps {
  episode: {
    title: string;
    episode_number: string;
    hero_image: string;
  };
}

const Episode = ({
  episode: { title, episode_number, hero_image },
}: EpisodeProps) => {
  return (
    <>
      <View style={styles.episode}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/public/images/${hero_image}`,
          }}
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
