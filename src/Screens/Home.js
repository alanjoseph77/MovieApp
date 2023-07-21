import { StatusBar, StyleSheet, Text, View ,TouchableOpacity,ScrollView} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon }from 'react-native-heroicons/outline';
import { useState } from 'react';
import Loading from '../Components/loading';
import TrendingMovies from '../Components/trendingMovies';
import MovieList from '../Components/movieList';
import { fetchTrendingMovies,fetchTopRatedMovies, fetchUpcomingMovies } from '../../api/moviedb';
const Home = ({navigation}) => {
    const[trending,setTrending]=useState([]);
    const[upcoming,setUpcoming]=useState([]);
    const[topRated,setTopRated]=useState([]);
    const[loading,setloading]=useState(true);

    useEffect(()=>{
      getTrendingMovies();
      getUpcomingMovies();
      getTopRatedMovies();


    },[])

   const getTrendingMovies=async()=>{
    const data=await fetchTrendingMovies();
    console.log('got trending movies',data)
    if(data && data.results)setTrending(data.results);
    setloading(false);
   }
   const getUpcomingMovies=async()=>{
    const data=await fetchUpcomingMovies();
    console.log('got upcoming movies',data)
    if(data && data.results)setUpcoming(data.results);
    
   }
   const getTopRatedMovies=async()=>{
    const data=await fetchTopRatedMovies();
    console.log('got TopRated movies',data)
    if(data && data.results)setTopRated(data.results);
    
   }

  return (
    <View style={styles.container}>
      {/* searchbar and logo */}
      <SafeAreaView >
      <StatusBar  backgroundColor='black'  />
        <View style={styles.searchBarContainer}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
            <Text style={styles.movieText1}>
            <Text style={styles.movieText}>M</Text>ovies</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"></MagnifyingGlassIcon>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading ?(
          <Loading/>
        ):(

          <ScrollView showsVerticalScrollIndicator={false} 
      contentContainerStyle={{paddingBottom:10}}>
        {/* Trending movies carousel */}
       {trending.length>0 && <TrendingMovies data={trending}/>}
        {/* upcoming movies list */}
       {upcoming.length>0&& <MovieList title="Upcoming Movies" data={upcoming}/>}
         {/* TopRated movies list */}
        {topRated.length>0&& <MovieList title="Top Rated " data={topRated}/>}

      </ScrollView>
        )
      }
      


    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Example background color
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  movieText:{
    color:"orange"

  }
  ,
  movieText1:{
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
