import React, { useState } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionican from 'react-native-vector-icons/Ionicons';
import Button from '../../components/general-components/button';




interface InputModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (review: string, rating: number) => void;
}

const ReviewClass: React.FC<InputModalProps> = ({ isVisible, onClose, onSave }) => {
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleSave = () => {
    // Perform any validation or processing on the review and rating here
    onSave(review, rating);
    setReview('');
    setRating(0);
    onClose();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          style={styles.star}
          onPress={() => setRating(i)}
        >
          <Ionican 
            name={i <= rating ? 'star' : 'star-outline'} // Use 'star' for filled stars and 'star-outline' for outline stars
            size={22}
            color={i <= rating ? '#FFD700' : '#C0C0C0'} // Change color for filled and outline stars
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.classFeedbackTxt}>Class Feedback</Text>
          <Text style={styles.RateTxt}>Rate your experience:</Text>
          <Text style={styles.RateQuestionTxt}>Are you satified with the teacher</Text>
          <View style={styles.ratingContainer}>{renderStars()}</View>
          <TextInput
            style={styles.input}
            placeholder="Tell us what you think of the class"
            value={review}
            onChangeText={(text) => setReview(text)}
            multiline={true}
          />
          {/* <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text>Submit Review</Text>
          </TouchableOpacity> */}
          <Button children="Submit Review" onPress={handleSave}/>
        
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 360,
    height: 350,
    elevation: 5, // Shadow for Android
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    minHeight: 100, // Set a minimum height for the text area
    textAlignVertical: 'top', // Allow vertical alignment of text in the text area
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  star: {
    padding: 5,
  },
  classFeedbackTxt :{
    color:'#000' ,
    fontWeight:'700' ,
    fontSize:14 ,
    textDecorationLine:'underline' ,
    marginBottom:15 ,
  },
  RateTxt:{
    color:'#000',
    fontWeight:'700' ,
    fontSize:24 ,
    marginBottom:5 ,
   

  },
  RateQuestionTxt:{
    color:'gray',
    fontWeight:'500' ,
    fontSize:12 ,
    marginBottom:10 ,
  }

});

export default ReviewClass;
