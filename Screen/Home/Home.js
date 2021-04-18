// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import Loader from '../Components/Loader';

class HomeScreen extends React.Component {
    state = {
        users: [],
        loading : false
      }
    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (!user) {
                this.props.navigation.navigate('LoginScreen')
            }
          });
        var users = [
            {
               name: 'brynn',
               avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            },
            {
                name : 'DANY',
                avatar : "wwww.whatever.com/p.png"
        
            },
            {
                name : 'farooq',
                avatar : 'aloha.png'
            }
           ];
        this.setState({ users : users});
        this.setState({loading : false})
    }
    logout = () =>{
        auth().signOut().then(() =>  {
            console.log('User signed out!');
            this.props.navigation.navigate('LoginScreen')
        });
        
    }
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.mainBody}>
                <Loader loading={this.state.loading} />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    }}>
                    <View>
                    <Card>
                        <Card.Title>CARD WITH DIVIDER</Card.Title>
                        <Card.Divider/>
                        {
                            this.state.users.map((u, i) => {
                            return (
                                <View key={i} style={styles.user}>
                                <Image
                                    style={styles.image}
                                    resizeMode="cover"
                                    source={{ uri: u.avatar }}
                                />
                                <Text style={styles.name}>{u.name}</Text>
                                </View>
                            );
                            })
                        }
                    </Card>
                    <KeyboardAvoidingView enabled>
                        <View style={{alignItems: 'center'}}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={this.logout}>
                            <Text style={styles.buttonTextStyle}>Logout</Text>
                        </TouchableOpacity>
                        </View>
                        
                    </KeyboardAvoidingView>
                    </View>
                </ScrollView>
                </View>
        )
    }
}
;
// const HomeScreen = ({navigation}) => {
//   const [userEmail, setUserEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [homePage, setHome] = useState(false);
  
// };
const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#808080',
      alignContent: 'center',
    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: '#7DE24E',
      borderWidth: 0,
      color: 'white',
      borderColor: 'black',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25,
      borderWidth : 2,
      borderColor : 'white'
    },
    buttonTextStyle: {
      color: 'white',
      paddingVertical: 10,
      fontSize: 16,
    },
    regBtnStyle : {
      color : 'black',
      paddingVertical : 10,
      fontSize :16,
    },
    inputStyle: {
      flex: 1,
      color: 'black',
      backgroundColor : 'pink',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
    registerTextStyle: {
      backgroundColor: 'white',
      borderWidth: 0,
      color: 'black',
      borderColor: 'black',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 25,
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
  });
export default HomeScreen;

