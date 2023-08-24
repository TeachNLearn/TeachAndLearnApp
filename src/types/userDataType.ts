export interface userDataType {
    _id: string;
    name: string;
    userName: string;
    photo: string;
    tagline: string;
    email: string;
    enrolledProgramme: string;
    role: string;
    phoneNumber: string;
    classesEnrolled: Array<any>
    classesTaken: string[];
    interestedSubjects: string[];
    strongSubjects: string[];
    preferredLanguages: string[];
  }