import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Episode from "./components/Episode";

export default function App() {
  let moviesArray: {
    title: string;
    episode_number: string;
    main_characters?: string[];
    description?: string;
    poster_image?: string;
    hero_image: string;
  }[] = [];

  const listRef = useRef<ScrollView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState(moviesArray);
  const [sort, setSort] = useState<"ascending" | "descending">("ascending");

  // smooth transition once sort is called
  function scrollToTop(): void {
    listRef.current!.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  }
  // get movies into state variable
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json"
    )
      .then((res) => res.json())
      .then((res) => {
        setMovies(
          res.movies.sort(
            (
              obj1: { episode_number: string },
              obj2: { episode_number: string }
            ) => Number(obj1.episode_number) - Number(obj2.episode_number)
          )
        );
        setIsLoading(false);
      });
  }, []);

  const renderItem = ({
    item,
  }: {
    item: {
      title: string;
      episode_number: string;
      hero_image: string;
    };
  }) => <Episode episode={item} />;

  function sortListById(): void {
    const copiedMovies = [...movies];
    copiedMovies.reverse();
    setSort(sort === "ascending" ? "descending" : "ascending");
    setMovies(copiedMovies);
    scrollToTop();
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isLoading && <Text>Loading...</Text>}

        {!isLoading && (
          <ScrollView style={styles.flatlist} ref={listRef}>
            <Text style={styles.heading as object}>Star Wars movies</Text>
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    height: 1,
    width: Dimensions.get("window").width,
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
