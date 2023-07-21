import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { fallbackPersonImage, image185 } from '../../api/moviedb'


const Cast = ({cast,navigation}) => {
    let personName="Carol Danvers"
    let CharacterName="Brie Larson"
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Top Cast</Text>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:15}}>
        {
            cast &&cast.map((person,index)=>{
                return(
                    <TouchableOpacity onPress={()=>navigation.navigate('Person',person)}
                    key={index}
                    style={{marginRight: 16,
                    alignSelf: 'center',}}>
                        <View styles={styles.container1}>
                            <Image source={{uri: image185(person?.profile_path) || fallbackPersonImage}} style={styles.image}></Image>
                            
                        </View>
                        
                        <Text style={{ color: "white", marginTop: 10, fontSize: 12 }}>
                  {person?.character ? (person.character.length > 10 ? person.character.slice(0, 10) + '...' : person.character) : ''}
                </Text>
                <Text style={{ color: "grey", marginTop: 10, fontSize: 12 }}>
                  {person?.original_name ? (person.original_name.length > 10 ? person.original_name.slice(0, 10) + '...' : person.original_name) : ''}
                </Text>
                    </TouchableOpacity>
                )
            })
        }


      </ScrollView>
    </View>
  )
}

export default Cast

const styles = StyleSheet.create({
    container: {
        marginTop: 24, // Adjust the margin value to match "my-6"
        marginBottom: 24, // Adjust the margin value to match "my-6"
      },
      text:{
        color:"white",
        marginLeft: 16, // Adjust the left margin value to match "mx-4"
        marginRight: 16, // Adjust the right margin value to match "mx-4"
        marginBottom: 20,
        fontSize: 18,
      },
      container1: {
        overflow: 'hidden',
        borderRadius: 10, // Adjust the border radius value to match "rounded-full"
        height: 80, // Adjust the height value to match "h-20"
        width: 80, // Adjust the width value to match "w-20"
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, // Adjust the border width value to match "border"
        borderColor: 'neutral-500', // Adjust the border color value to match "border-neutral-500"
      },
      image: {
        borderRadius: 100, // Adjust the border radius value to match "rounded-2xl"
        height: 96, // Adjust the height value to match "h-24"
        width: 80, // Adjust the width value to match "w-20"
      },
})