//THIS LISTENS FOR THE ACTION USER_SELECTED
// YOU CAN SETUP REDUCER TO RESPOND TO actions
export default function(state=null, action){

// DECIDE WHICH ANNOUNCMENTS YOU CARE ABOUT and what you wanna return

  switch(action.type){
      case "USER_SELECTED":
      return action.payload;
      break;
    }
    return state;

}
