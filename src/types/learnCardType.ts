export interface learnCardProps {
  _id: string;
  createdBy: {
    name: string;
    photo: string;
    _id: string;
    userName: string;
  };
  subject: string;
  topic: string;
  programme: string;
  standard: string;
  dueDate: string;
  interestedStudents: string[];
  preferredLanguage: string;
  description: string;
  tags: string[];
  isTeachCard:boolean
}
