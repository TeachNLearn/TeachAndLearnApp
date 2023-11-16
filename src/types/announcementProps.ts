export interface announcementProps {
    classroom: string;
    comments: [];
    content: string;
    createdAt: string;
    sender: {
      _id: string;
      // name: string;
      photo: string;
      userName: string;
    };
    _id: string;
    props:any
  }