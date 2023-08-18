export interface forumProps {
  _id: string;
  answers: string[];
  createdBy: {
    _id: string;
    userName: string;
    name?: string;
    photo?: string;
  };
  tagline: string;
  question: string;
  topic: string;
  upvotes: string[];
  createdAt: string;
}
