import React, { useCallback, useState } from "react";
import { View, Text, TextInput, TouchableOpacity ,ScrollView,Image, Dimensions} from "react-native";
import { StatusBar } from "react-native";
import _ from 'lodash'; // Import Lodash
import { SafeAreaView } from "react-native-safe-area-context";
import { MagnifyingGlassIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Loading from "../Components/loading";
import { fallbackMoviePoster, image185, searchMovies } from "../../api/moviedb";
var {width,height}=Dimensions.get('window')
const Detail = () => {
  let movieName="Captain-Marvel"
  const navigation=useNavigation();
  const[results,setresults]=useState([]);
  const[loading,setloading]=useState(false);
  const handleSearch=value=>{
    if(value&&value.length>2){
      setloading(true);
      searchMovies({
        query:value,
        include_adult:'false',
        language:'en-US',
        page:'1'
      }).then(data=>{
        setloading(false);
        console.log('got Movies',data);
        if(data&&data.results)setresults(data.results);

      })
    }else{
      setloading(false);
      setresults([])
    }
  }
  const handleTextDebounce = useCallback(_.debounce(handleSearch, 400), []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          marginLeft: 4,
          marginBottom: 3,
          borderColor: "grey",
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 180,
          marginRight: 4,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor="white"
          style={{
            flex: 1,
            paddingLeft: 6,
            paddingBottom: 10,
            fontWeight: "semibold",
            backgroundColor: "black",
            color:"white"
          }}
        />
        <TouchableOpacity onPress={()=>navigation.navigate("Home")}
          style={{
            padding: 5,
            borderRadius: 9999,
            backgroundColor: "black",
            margin: 4,
          }}
        >
          <XMarkIcon size={28} strokeWidth={2} color="white" />
        </TouchableOpacity>
      </View>
      {/* RESULTS */}
      {
        loading?(
          <Loading/>
        ): 
          results.length>0?(
            <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}
        style={{marginBottom: 3,marginTop:10}}>
          <Text style={{color:"white",fontWeight:"bold",marginLeft:1}}>Results({results.length})</Text>
  
          <View style={{flexDirection:"row",justifyContent:"space-between",flexWrap:'wrap'}}>
            {
              results.map((item,index)=>{
                return(
               <TouchableWithoutFeedback
    key={index}
    onPress={() => navigation.push('Movie', item)}
  >
    <View style={{ paddingVertical: 8, marginBottom: 4 }}>
      {/* <Image
        style={{ borderRadius: 13, width: width * 0.44, height: height * 0.3 }}
        source={require('../../assets/marvel.jpg')}
      /> */}
      <Image source={{uri:image185(item?.poster_path)||fallbackMoviePoster}}
      style={{ borderRadius: 13, width: width * 0.44, height: height * 0.3 }}/>
      {/* <Text style={{color:"white",marginLeft:10,marginBottom:5}}>{
        movieName.length>14 ?movieName.slice(0,14)+'...':movieName}</Text> */}
           <Text style={{color:"white",marginLeft:10,marginBottom:5}}> {
            item.title.length>22? item.title.slice(0,22)+'...': item.title
            }</Text>
    </View>
  </TouchableWithoutFeedback>
                )
              })
            }
  
          </View>
  
  
         
  
  
        </ScrollView>
  
          ):(
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:'center',marginTop:200}}>
              <Image source={require('../../assets/movietime1.jpg')}
              />
              
              
            </View>
          )
        
      }

     
      
    </SafeAreaView>
  );
};

export default Detail;
