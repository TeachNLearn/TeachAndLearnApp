export interface classReview {
  _id: string;
  review: string;
  rating: number;
  classroom: string;
  teacher: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  createdAt: string;
  updatedAt: string;
}
