import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import Episode from "./components/Episode";

export default function App() {
  const listRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<any[]>([]);
  const [sort, setSort] = useState("ascending");

  // smooth transition once sort is called
  function scrollToTop(): void {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      listRef.current.scrollTo({ x: 0, y: 0, animated: true });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  // get movies into state variable
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json"
    )
      .then((res) => res.json())
      .then((res) => setMovies(res.movies))
      .then(() => setIsLoading(false));
  }, []);

  const renderItem = ({
    item,
  }: {
    item: { title: string; episode_number: string; hero_image: string };
  }) => <Episode episode={item} />;

  function sortListById(): void {
    const copiedMovies = [...movies];
    copiedMovies.sort((obj1, obj2) => {
      if (sort === "ascending") {
        return obj2.episode_number - obj1.episode_number;
      } else {
        return obj1.episode_number - obj2.episode_number;
      }
    });

    setSort(sort === "ascending" ? "descending" : "ascending");
    setMovies(copiedMovies);
    scrollToTop();
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isLoading && <Text>Loading...</Text>}

        {!isLoading && (
          <ScrollView ref={listRef as any}>
            <Text style={styles.heading as any}>Star Wars movies</Text>
            <FlatList
              data={movies}
              extraData={sort}
              renderItem={renderItem}
              keyExtractor={(item) => item.episode_number}
            />
            <TouchableOpacity style={styles.button} onPress={sortListById}>
              <Text style={styles.buttonText}>
                {sort === "ascending"
                  ? "Sort in descending order"
                  : "Sort in ascending order"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px",
    marginBottom: "30px",
  },
  heading: {
    marginBottom: "30px",
    fontSize: 30,
    fontWeight: 800,
    textAlign: "center",
  },
  button: {
    width: 350,
    backgroundColor: "blue",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 10,
  },
});
