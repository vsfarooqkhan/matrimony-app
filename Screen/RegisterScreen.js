// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Picker,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import Loader from './Components/Loader';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

  class RegisterScreen extends React.Component {
    constructor(props) {
      super(props); 
      //this.getData();
    }
    
    state = {
      users: [],
      loading : false,
      firstName : null,
      lastName : null,
      userEmail : null,
      password : null,
      userAge : null,
      dob : "2002-06-30",
    }
    
    setLoading = () => {
      this.setState({loading : false})
    } 
    componentDidMount() {
      //this.getData();
    }
  handleSubmitButton = () => {
    // setErrortext('');
    if (this.state.firstName == null) {
      Alert.alert('Please fill First Name');
      return;
    }
    if (this.state.userEmail == null) {
      Alert.alert('Please fill Email');
      return;
    }
    if (this.state.userAge == null) {
      Alert.alert('Please fill Age');
      return;
    }
    if (this.state.password == null) {
      Alert.alert('Please fill Password');
      return;
    }
    else {
      //Show Loader
      this.setLoading(true);
      var dataToSend = {
        firstName: this.state.firstName,
        lastName : this.state.lastName,
        email: this.state.userEmail,
        age: this.state.userAge,
        gender : this.state.gender,
        dob : this.state.dob,
        password: this.state.password,
      };
      
      auth().createUserWithEmailAndPassword(this.state.userEmail, this.state.password).then((result) => {
        firestore().collection('users').doc(result.uid).set(
          dataToSend
        ).then((res) => {
          this.setLoading(false);
          Alert.alert("Registration Success");
          this.props.navigation.navigate('HomeScreen')
        });
      }).catch(error => {
        Alert.alert(error.message)
        console.log(error)
      });;
    }
    
  };
  handleChange(e) {
    console.log(e)
    this.setState({ [e.target.name] : e.target.value });
 }
  render() {
    const { navigation } = this.props;
    return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Loader loading={this.state.loading} />
          <ScrollView
            >
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/logo.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <KeyboardAvoidingView enabled>
              <View>
              <Text style={styles.label}>First Name :</Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(firstName) => { this.setState({ firstName }) }}
                  name="firstName"
                  underlineColorAndroid="#f000"
                  placeholder="Enter First Name"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View>
              <Text style={styles.label}>Last Name :</Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(lastName) => { this.setState({ lastName }) }}
                  name="lastName"
                  underlineColorAndroid="#f000"
                  placeholder="Enter Last Name"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View>
              <Text style={styles.label}>Email :</Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(userEmail) => { this.setState({ userEmail }) }}
                  name="userEmail"
                  underlineColorAndroid="#f000"
                  placeholder="Enter Email"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="email-address"
                  blurOnSubmit={false}
                />
              </View>
              <View>
              <Text style={styles.label}>Mobile Number (+91) :</Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.inputStyle}
                  onChangeText={(mobileNumber) => { this.setState({ mobileNumber }) }}
                  name="mobileNumber"
                  underlineColorAndroid="#f000"
                  placeholder="Enter Mobile Number"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View>
                <Text style={styles.label}>Password</Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(password) => { this.setState({ password }) }}
                  name="password"
                  underlineColorAndroid="#f000"
                  placeholder="Enter Password"
                  placeholderTextColor="#8b9cb5"
                  returnKeyType="next"
                  secureTextEntry={true}
                  blurOnSubmit={false}
                />
              </View>
              <View>
                <Text style={styles.label}>Age </Text>
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(userAge) => { this.setState({ userAge }) }}
                  name="age"
                  underlineColorAndroid="#f000"
                  placeholder="Enter Age"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="numeric"
                  
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
              </View>
              <View>
                <Text style={styles.label}>Gender</Text>
              </View>
              <View style={styles.SectionStyle}>
                <Picker
                    style={styles.inputStyle}
                    selectedValue={this.state.gender}
                    onValueChange={(gender) => { this.setState({ gender }) }}
                >
                    <Picker.Item label="Male" value="m" />
                    <Picker.Item label="Female" value="f" />
                    <Picker.Item label="Others" value="o" />
                </Picker>
              </View>
              
              <View>
                <Text style={styles.label}>Date Of Birth</Text>
              </View>
              <View style={styles.SectionStyle}>
              <DatePicker
                    style={styles.datePickStyle}
                    onDateChange = {(dob) => { this.setState({ dob }) }}
                    value = {this.state.dob}
                    mode="date"
                    name = "dob"
                    format="YYYY-MM-DD"
                    minDate="1950-05-01"
                    maxDate="2002-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        right: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                    }}
                />
              </View>
              <View style = {styles.label}>
                  <Text>By submitting you have to agree to our Privacy Policy . </Text>
              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={this.handleSubmitButton}>
                <Text style={styles.buttonTextStyle}>REGISTER</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
    )
  }
  
};
export default function (props) {
  const navigation = useNavigation();
  return <RegisterScreen {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 35,
    marginRight: 35,
    
  },
  label: {
    flexDirection: 'row',
    height: 20,
    marginTop: 0,
    marginLeft: 38,
    marginRight: 38,
    
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  datePickStyle: {
    flex: 1,
    width : "100%",
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    borderColor: 'black',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});