import React, {useMemo, useState} from 'react';
import StarIcon from '../SVGComponents/StarIcon';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ratingProps {
  rating: number;
  onRating: any;
}

const Rating = ({onRating, rating}: ratingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index: number) => {
    console.log('Checking');

    let bool = false;
    if (hoverRating >= index) {
      //   return true;
      bool = true;
    } else if (!hoverRating && rating >= index) {
      //   return true;
      bool = true;
    }

    // return false;
    return bool;
  };

  const starClickhandler = (idx: number) => {
    onRating(idx);
    setHoverRating(idx);
  };

  const starRating = useMemo(() => {
    return Array(10)
      .fill(0)
      .map((_, i) => i + 1)
      .map(idx => (
        <TouchableOpacity key={idx} onPress={() => starClickhandler(idx)}>
          <StarIcon
            color={getColor(idx) ? '#ffc557' : 'rgba(125, 137, 176, 0.2)'}
          />
        </TouchableOpacity>
      ));
  }, [rating, hoverRating]);

  return <View style={styles.container}>{starRating}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Rating;
