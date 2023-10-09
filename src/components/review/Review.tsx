import { StyleSheet, Text, View,TouchableOpacity ,ActivityIndicator} from 'react-native'
import React from 'react'
import { COLORS_ELEMENTS, COLORS_ILLUSTRATION, SCREEN_HEIGHT } from '../../utils/globalContants'
import FormField from '../general-components/FormField'
import InputHolder from '../inputComponents/inputHolder'
import { Rating, AirbnbRating } from 'react-native-ratings';

interface createReviewProps {
  review:string
}



const Review = () => {
  const initialReviewData: createReviewProps = {
    review:''
  };
  
  const [review, setReview] = React.useState<createReviewProps>(initialReviewData);
  const [rating, setRating] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  function updateFields(fields: Partial<createReviewProps>) {
    setReview(prev => {
      return {...prev, ...fields};
    });
  }
  const ratingCompleted = (rating:number) =>{
    setRating(rating)
  }

  const submitReview = async()=>{
    try {
      setLoading(true)
      //logic
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <View style={{height:SCREEN_HEIGHT/2}}>
       {/* <CardHeader
        title={'Class Feedback'}
        ShowMenuIcon={false}
        // onBackPress={() => {props.navigation.goBack()}}
        onMenuPress={() => {}}
      /> */}
      <View style={{padding:10}}>
     
      <View>
        <Text style={styles.heading}>Rate your experience</Text>
        <Text>Are you satisfied with the teacher</Text>
      </View>
      <View style={{alignItems:'flex-start',bottom:40}}>
       <AirbnbRating
            count={10}
            defaultRating={3}
            reviews={["", "", "", "", "", "", "", "", "", "", ""]}
            size={20}
            onFinishRating={ratingCompleted}
       />
    
    </View>
    <View style={{bottom:40}}>
      <FormField
          elem={
            <InputHolder
              type="text"
              label="Question"
              name="question"
              value={review.review}
              updateFields={updateFields}
              placeholderText="Tell us what you think of this classes"
              isTextarea={true}
              textareaLines={8}
            />
          }
          inputDesc=""
      />

      <TouchableOpacity onPress={()=>submitReview()} style={styles.button2}>
          <Text style={{color:COLORS_ELEMENTS.buttonTxt}}> {loading ?<ActivityIndicator size={'small'} color={COLORS_ELEMENTS.buttonTxt} /> :'Submit'}</Text>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}

export default Review

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine:'underline',
    color:'#000'
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom:3,
    color:'#000'
  },
  button2: {
    alignSelf: 'flex-end',
    padding: 10,
    paddingHorizontal:40,
    backgroundColor:COLORS_ILLUSTRATION.stroke ,
    borderRadius:10,
    marginTop:20 ,
  },
})