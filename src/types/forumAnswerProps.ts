export interface answerProps {
    _id: string;
    answer: string;
    answeredBy: {
      _id: string;
      name: string;
      photo: string;
      userName: string;
    };
    upvotes: string[];
    createdAt: string;
  }