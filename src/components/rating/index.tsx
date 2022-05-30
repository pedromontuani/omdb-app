import React from 'react';

import StarRating from 'react-native-star-rating';
import { useTheme } from 'styled-components/native';

interface IRatingProps {
  rating: number;
}

const Rating: React.FC<IRatingProps> = ({ rating }) => {
  const { colors } = useTheme();

  return (
    <StarRating
      maxStars={5}
      rating={rating || 0}
      emptyStarColor={colors.rating}
      fullStarColor={colors.rating}
      halfStarColor={colors.rating}
      emptyStar={'star-o'}
      fullStar={'star'}
      halfStar={'star-half-o'}
      iconSet={'FontAwesome'}
      starSize={20}
      disabled
    />
  );
};

export default React.memo(Rating);
