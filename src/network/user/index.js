import firebase from "../../firebase/config";

export const AddUser = async (name, email, uid, profileImg) => {
  try {
    return await firebase
    .database()
    .ref("users/"+ uid)
    .set({
        name: name,
        email: email,
        uuid: uid,         //unique user id
        profileImg: profileImg,
    });
  } catch (error) {
    return error;
  }
};

