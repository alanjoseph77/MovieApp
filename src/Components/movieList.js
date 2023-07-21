import { StyleSheet, Text, View,TouchableOpacity,ScrollView ,Image, Dimensions} from 'react-native'
import React from 'react'
import { moviesData } from '../constants'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
var {width,height}=Dimensions.get('window');
import { fallbackMoviePoster, image185, image342, poster342 } from '../../api/moviedb';

// MovieList.js
// ...other imports...

const MovieList = ({ title, data, hideSeeAll }) => {
  let movieName = "Ant-Man and the Wasp: Quantumania";
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 8, marginTop: 18, marginLeft: 8 }}>
      <View style={{ marginHorizontal: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18 }}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={{ color: 'yellow', fontSize: 15 }}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((item, index) => {
          const movieName = item?.title || "Unknown";
          const posterPath = item?.poster_path;
          const backdropPath = item?.backdrop_path;
          const movieImage = posterPath ? image185(posterPath) : image342(backdropPath) || fallbackMoviePoster;

          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}>
              <View style={{ marginTop: 29, marginBottom: 4, marginRight: 16 }}>
                {/* Add conditional check for movieImage */}
                {movieImage ? (
                  <Image source={{ uri: movieImage }} style={{ width: width * 0.33, height: height * 0.24, borderRadius: 10 }} />
                ) : (
                  <Text style={{ color: 'white' }}>Image not available</Text>
                )}
                <Text style={{ color: 'white', fontSize: 16 }}>
                  {movieName.length > 14 ? movieName.slice(0, 14) + '...' : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
