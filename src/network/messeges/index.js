//import firebase from '../../firebase/config';
import firebase from 'firebase';

export const senderMsg = async (email, password) => {
  try {
    return await firebase
      .database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .push({
        messege: {      //message object
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: img,
        },
      });
  } catch (error) {
    return error;
  }
};

export const recieverMsg = async (
    msgValue,
    currentUserId,
    guestUserId,
    img,
    ) => {
    try {
        return await firebase
        .database()
        .ref('messeges/' + guestUserId)
        .child(currentUserId)
        .push({
          messege: {      //message object
            sender: currentUserId,
            reciever: guestUserId,
            msg: msgValue,
            img: img,
          },
        });
    } catch (error) {
      return error;
    }
  };
  