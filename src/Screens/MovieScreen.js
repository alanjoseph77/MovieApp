import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions,Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../Components/cast';
import MovieList from '../Components/movieList';
import Loading from '../Components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../../api/moviedb';

let movieName="Captain-Marvel"
var {width,height}=Dimensions.get('window')
const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation=useNavigation();
  const[cast,setCast]=useState([1,2,3,4,5])
  const[similarMovies,setSimilarMovies]=useState([])
  const[loading,setLoading]=useState(false);
  const[movie,setMovie]=useState({})
  
  const [isFavourite, toggleFavourite] = useState(false);

  // useEffect(() => {
  //   // Any additional logic you want to add
  //   console.log('itemid',item.id)
  //   setloading(true);
  //   getMovieDetails(item.id)
  // }, [item]);
  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);
  const getMovieDetails=async (id)=>{
    const data=await fetchMovieDetails(id);
    console.log('got Movie Details',data);
    if(data)setMovie(data);
    setLoading(false);
  }
  const getMovieCredits = async id=>{
    const data = await fetchMovieCredits(id);
    console.log('got movie credits')
    if(data && data.cast){
        setCast(data.cast);
    }

  }
  const getSimilarMovies = async id=>{
    const data = await fetchSimilarMovies(id);
    console.log('got similar movies');
    if(data && data.results){
        setSimilarMovies(data.results);
    }

  }
  
  const movieName = movie?.title || "Unknown";

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={styles.container}>
      {/* backbutton and movie poster */}
      <View style={{ width: '100%' }}>
        <SafeAreaView style={styles.searchBarContainer}>
          <TouchableOpacity style={styles.movieText} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="20" strokeWidth={2.6} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size="21" strokeWidth={2.4} color={isFavourite ? '#FF0000' : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>
        {
          loading?(
            <Loading/>
          ):(
            <View>
            {/* <Image source={require("../../assets/marvel.jpg") }
            style={{width,height:height*0.55,borderTopLeftRadius:190,borderTopRightRadius:190}}/> */}
            <Image source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
            style={{width,height:height*0.55,borderTopLeftRadius:90,borderTopRightRadius:90}}/>
         <LinearGradient
    colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 1)']}
    style={{ width, height: height * 0.50, position: 'absolute', bottom: 0 }}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
  />
   </View>

          )
        }
     
</View>
{/* movie details */}
<View>
  {/* title */}
  <Text style={{color:"white",fontSize:30,textAlign: 'center',fontFamily:'Helvetica',fontWeight:"bold"}}>
    {movie?.title}
  </Text>
  <Text style={styles.movieText1}>
  {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
  </Text>
  {/* geners */}
<View style={{flexDirection:"row", justifyContent:"center",fontSize: 16,textAlign:"centre"}}>
{/* <Text style={styles.movieText2}>
    Action .
  </Text>
  <Text style={styles.movieText2}>
    Thrill . 
  </Text>
  <Text style={styles.movieText2}>
    Comedy
  </Text> */}

{
                movie?.genres?.map((genre,index)=>{
                    let showDot = index+1 != movie.genres.length;
                    return (
                        <Text key={index} style={styles.movieText1}>
                            {genre?.name} {showDot? "•":null}
                        </Text>
                    )
                })
            }
</View>
{/* description */}
<Text style={styles.description}>
 {
                movie?.overview
            }</Text>
</View>
    {/* Cast */}
    {
        movie?.id && cast.length>0 && <Cast navigation={navigation} cast={cast} />
      }
    {/* simmilar movies */}
    {
        movie?.id && similarMovies.length>0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
      }

    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Example background color
  },
  searchBarContainer: {
    position: 'absolute',
    zIndex: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  movieText: {
    borderRadius: 8, // Example value for rounded corners
    paddingBottom: 4,
  },
  movieText1: {
    color: 'grey', // Replace with your desired color value
    textAlign: 'center',
    fontFamily: 'SemiBold', // Replace with the appropriate font family
    fontSize: 16, // Replace with your desired font size
    marginTop:10
  },
  movieText2: {
    color: 'grey', // Replace with your desired color value
    textAlign: 'center',
    fontFamily: 'SemiBold', // Replace with the appropriate font family
    fontSize: 15, // Replace with your desired font size
    marginTop:10
  },
  description: {
    marginLeft: 16, // Adjust the left margin value to match "mx-4"
    marginRight: 16, // Adjust the right margin value to match "mx-4"
    letterSpacing: 1, // Adjust the letter spacing value to match "tracking-wide"
    color:"grey",
    textAlign: 'center',
    fontSize: 10,
    marginTop:6
  },
  
});
