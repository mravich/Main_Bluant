// THIS WHOLE FILE IS AN ACTION CREATOR


// THESE ACTIONS they dont really do anyhthing or manipulate they just sey
// HEY SOMETHING HAPPENED! AND IT IS UP TO THE REDUCER TO DECIDE HOW IT IS GOING TO CHANGE YOUR APPLICATIOBN
// ALL ACTIONS ARE SENT TO ALL REDUCERS
export const selectUser = (user) => {
  console.log("YOU CLICKED ON USER: " + user.first);

  // THIS IS THE ACTION
  return {
    type: "USER_SELECTED",
    payload: user
  }
};
