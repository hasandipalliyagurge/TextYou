import React, { useLayoutEffect, useContext, useEffect, useState } from 'react';
import {View, Text, Alert, FlatList, SafeAreaView } from 'react-native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { color, globalStyle } from '../../utility';
import LogOutUser from '../../network/logout';
import { clearAsyncStorage } from '../../asyncStorage';
//import firebase from '../../firebase/config';
import firebase from 'firebase';
import { LOADING_STOP, LOADING_START } from '../../context/actions/types';
import { uuid} from '../../utility/constants';
import { Profile, ShowUsers } from '../../component';
//import { database } from 'firebase';
//import { SafeAreaView } from 'react-native-safe-area-context';
import { Store } from '../../context/store';


const Dashboard= ({navigation}) => {
    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    const [userDetail, setUserDetail] = useState({
        id: '',
        name: '',
        profileImg: '',
      });
      //const [getScrollPosition, setScrollPosition] = useState(0);
    const [allUsers, setAllUsers] = useState([]);
    const { profileImg, name } = userDetail;
       
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
            <SimpleLineIcon 
                name="logout" 
                size={26} 
                color={color.WHITE} 
                style={{right: 10}}
                onPress= {() => 
                    Alert.alert(
                        'Logout', 
                        'Are you sure to log out', 
                    [
                    {
                        text:'Yes',
                        onPress:() => logout(),
                    },
                    {
                        text:'No'
                    }  
                ],{
                   cancelable:false  
                })}
                />
        ),
        });
    },[navigation]);

useEffect(()=>{
dispatchLoaderAction({
    type: LOADING_START,
});
try{
    firebase
    .database()
    .ref('users')
    .on('value', (dataSnapShot) => {
        let users = [];
        let currentUser = {
          id: '',
          name: '',
          profileImg: '',
        };
        dataSnapShot.forEach((child) => {
          if (uuid === child.val().uuid) {
            currentUser.id = uuid;
            currentUser.name = child.val().name;
            currentUser.profileImg = child.val().profileImg;
          } else {
            users.push({
              id: child.val().uuid,
              name: child.val().name,
              profileImg: child.val().profileImg,
            });
          }
        });
        setUserDetail(currentUser);
        setAllUsers(users);
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
      });
  } catch (error) {
    //alert(error);
    dispatchLoaderAction({
      type: LOADING_STOP,
    });
    alert(error);
  }
}, []);




const logout = () => {
    LogOutUser()
    .then(()=> {
        clearAsyncStorage()
        .then( () => {
            navigation.replace('Login')
        })
        .catch((err) => alert(err))
    })
    .catch((err)=>alert(err))
};


    return (
        <SafeAreaView style={[globalStyle.flex1, {backgroundColor:color.BLACK}]}>
         <FlatList
            alwaysBounceVertical={false}
            data={allUsers}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={
                <Profile
                img={profileImg}
                name={name}
                />
            }
            renderItem={({item}) => (
                <ShowUsers name={item.name} img= {item.profileImg} />
            )}
          />
        </SafeAreaView> 
    );
};

export default Dashboard;