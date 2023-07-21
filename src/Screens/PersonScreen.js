import { Dimensions, StyleSheet, Text, View ,ScrollView,SafeAreaView,TouchableOpacity,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/outline';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../Components/movieList';
import Loading from '../Components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500} from '../../api/moviedb';
var {width,height}=Dimensions.get('window');
const PersonScreen = () => {

  const {params: item} = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const [person, setPerson] = useState({});
  const[personMovies,setPersonMovies]=useState([])
  const[loading,setLoading]=useState(false);
  const navigation=useNavigation();
  const circleSize = 72;
  useEffect(()=>{
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
},[item]);

const getPersonDetails = async id=>{
    const data = await fetchPersonDetails(id);
    console.log('got person details');
    setLoading(false);
    if(data) {
        setPerson(data);
    }
}
const getPersonMovies = async id=>{
  const data = await fetchPersonMovies(id);
  console.log('got person movies')
  if(data && data.cast){
      setPersonMovies(data.cast);
  }

}

  return (
   <ScrollView container={{paddingBottom:20}}
   style={{flex:1,backgroundColor:"black"}}> 
   <View style={{ width: '100%'}}>
    {/* backbutton */}
   <SafeAreaView style={{width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:4}}>
   <TouchableOpacity style={styles.movieText} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={20} strokeWidth={2.6} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
  <HeartIcon size="21" strokeWidth={2.4} color={isFavourite ? '#FF0000' : 'white'} />
</TouchableOpacity>

        </SafeAreaView>
        {/* person details */}
        {loading?(
          <Loading/>
        ):(
          <View>
          <View style={{flexDirection:"row",justifyContent:"center",shadowColor:"white",shadowRadius:40,shadowOffset:{width:0,height:5},shadowOpacity:1}}>
            <View style={{alignItems:"center",alignItems:"center",borderRadius:999,
      overflow: 'hidden',
      height: '72px',
      width: '72px',
      border: '2px solid',borderColor:"grey",borderWidth:2}}>
         {/* <Image source={{uri: image342(person?.profile_path) || fallbackPersonImage}} style={{height:height*0.43,width:width*0.74}}></Image> */}
            {/* Add conditional check for person.profile_path */}
                {person?.profile_path ? (
                  <Image source={{ uri: image342(person.profile_path) || fallbackPersonImage }} style={{ height: height * 0.43, width: width * 0.74 }} />
                ) : (
                  <Text style={{ color: "white" }}>Image not available</Text>
                )}
            </View>
            </View>

   
<View>
  {/* title */}
  <Text style={{color:"white",fontSize:30,textAlign: 'center',fontFamily:'Helvetica',fontWeight:"bold"}}>
  {person?.name}
  </Text>
  
<View style={{flexDirection:"row", justifyContent:"center",fontSize: 16,textAlign:"centre"}}>
<Text style={styles.movieText2}>
{person?.place_of_birth}
  </Text>
 
</View>


</View>

<View style={{display: 'flex', 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  backgroundColor: 'grey', 
  margin: 20, 
  padding: 9, 
  marginTop: 30,
  borderRadius:100 ,borderWidth:2}}>
  <View style={{borderColor:"white",alignItems:"center",borderRightWidth:2,}}>
    <Text style={{color:"white",marginRight:7}}>Gender</Text>
    <Text style={{color:"white",marginRight:7}}> {
      person?.gender==1? 'Female': 'Male'
     }</Text>

  </View>

  <View style={{borderRadius:2,borderColor:"white",alignItems:"center",borderRightWidth:2,}}>
  <Text style={{color:"white",marginRight:7,}}>Birthday</Text>
    <Text style={{color:"white",marginRight:7,}}>
    {person?.birthday}
    </Text>

  </View>
  <View style={{borderRadius:2,borderColor:"white",alignItems:"center",borderRightWidth:2,}}>
  <Text style={{color:"white",marginRight:7,}}>Known for</Text>
    <Text style={{color:"white",marginRight:7,}}>
    {person?.known_for_department}
    </Text>

  </View>
  <View style={{borderRadius:2,borderColor:"white",alignItems:"center",}}>
  <Text style={{color:"white",marginRight:7,}}>Popularity</Text>
    <Text style={{color:"white",marginRight:7,}}>
    {person?.popularity?.toFixed(2)} %
    </Text>

  </View>

</View>

        <View style={{}}>
          <Text style={styles.description1}>Biography</Text>
        <Text style={styles.description}>
        {
        person?.biography? person.biography : 'N/A'
       }</Text>



        </View> 

        </View>
          
        )
        }
      

      { person?.id && personMovies.length>0 && <MovieList title="Movies" hideSeeAll={true} data={personMovies} /> }

   </View>

   </ScrollView>
  )
}

export default PersonScreen

const styles = StyleSheet.create({
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
  description1: {
    marginLeft: 16, // Adjust the left margin value to match "mx-4"
    marginRight: 16, // Adjust the right margin value to match "mx-4"
    letterSpacing: 1, // Adjust the letter spacing value to match "tracking-wide"
    color:"grey",
    textAlign: 'center',
    fontSize: 15,
    marginTop:6
  },
  movieText: {
    borderRadius: 8, // Example value for rounded corners
    paddingBottom: 4,
  },
})