import { StyleSheet, Text, View ,TouchableOpacity,Image, Dimensions} from 'react-native'
import React from 'react'
import { Carousel } from 'react-native-snap-carousel'
import { Touchable } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { image500 } from '../../api/moviedb'

var {width,height}=Dimensions.get('window')
const TrendingMovies = ({data}) => {
    const navigation=useNavigation();
    const handleClick=(item)=>{
        navigation.navigate('Movie',item)

    }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Trending</Text>
      <Carousel data={data}
      renderItem={({item})=><Moviecard item={item} handleClick={handleClick}/>}
      firstItem={1}
      inactiveSlideOpacity={0.60}
      sliderWidth={width}
      itemWidth={width*0.62}
      slideStyle={{display:"flex",alignItems:"center"}}/>
    </View>
  )
}
const Moviecard=({item,handleClick})=>{
  
return(
    <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
    <TouchableOpacity>
       <Image source={{uri:image500(item.poster_path)}} style={{width:width*0.6,height:height*0.4,borderRadius: 24,}}
       />
    </TouchableOpacity>
    </TouchableWithoutFeedback>
)
}

export default TrendingMovies

const styles = StyleSheet.create({
    container:{
        marginBottom:8,
        
    },
    text:{
        fontSize: 18,
        marginHorizontal: 16,
        marginBottom: 20,
        marginTop:10,
        color:"white"
    }
})