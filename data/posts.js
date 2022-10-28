import { USERS } from "./users";

export const POSTS = [
  {
    imageUrl:
      "https://ngalup.co/wp-content/uploads/2021/01/Strategi-Elon-Musk-1-scaled.jpg",
    user: USERS[0].user,
    likes: 9567,
    caption: "Launching Tesla soon in India and Mars 🤣😂🤑",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "lara_sam",
        comment: `Wow! That's great to hear`,
      },
      {
        user: "naveen_raj",
        comment: `Please don't launch anything`,
      },
    ],
  },
  {
    imageUrl: "https://images.indianexpress.com/2020/12/rajinikanth-1200-1.jpg",
    user: USERS[2].user,
    likes: 7690,
    caption: "Cool😎",
    profile_picture: USERS[2].image,
    comments: [
      {
        user: "gowtham_remo",
        comment: "Thalaiva vera maari thalaiva",
      },
      {
        user: "mack_magesh",
        comment: "Kamal is best",
      },
    ],
  },
];
