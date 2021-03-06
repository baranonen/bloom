import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Alert,
  AsyncStorage,
  Linking,
  TouchableOpacity
} from 'react-native';

import Back from '../../shared/Back/Back';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import Dropdown from '../../shared/Dropdown/Dropdown';

import api from '../../shared/api';

export default class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    school: ''
  };

  componentWillMount() {
    this.schools = [
      'ALEV Lisesi',
      'Alman Lisesi',
      'Avusturya Lisesi',
      'Bahçelievler Anadolu Lisesi',
      'Beşiktaş Anadolu Lisesi',
      'Cağaloğlu Anadolu Lisesi',
      'Çapa Fen Lisesi',
      'Çevre Koleji',
      'FMV Işık Lisesi',
      'Galatasaray Lisesi',
      'Hacı Ömer Tarman Anadolu Lisesi',
      'İstanbul Erkek Lisesi',
      'Kabataş Erkek Lisesi',
      'Kadıköy Anadolu Lisesi',
      'Notre Dame de Sion',
      'Robert Kolej',
      'Saint Benoit',
      'Saint Joseph',
      'Saint Michel',
      'Saint Pulcherie',
      'Sakıp Sabancı Anadolu Lisesi',
      'Terakki Lisesi',
      'Ulus Özel Musevi Lisesi',
      'Üsküdar Amerikan Lisesi',
      'Vefa Lisesi',
      'Yaşar Acar Fen Lisesi',
    ];
  }

  onChangeText = (key) => {
    return (input) => this.setState({[key]: input});
  }
  onSelect = (key) => {
    return (index, input) => this.setState({[key]: input});
  }

  register = () => {
    api(
      {
        path: 'auth/register',
        method: 'POST',
        body: this.state
      },
      (err, res) => {
        if (err && !res.jwt) return Alert.alert(err);
        AsyncStorage.setItem('jwt', res.jwt);
        this.props.navigation.navigate('Feed', {jwt: res.jwt});
      }
    );
  }

  render() {
    return (
      <View style={styles.register}>
        <View style={styles.headingContainer}>
          <Back onPress={this.props.animationPresets['Landing']} />
          <Text style={styles.heading}>Kayıt Ol</Text>
        </View>
        <View style={styles.halfInputs}>
          <Input 
            onChangeText={this.onChangeText('firstName')} 
            type="firstName"
            placeholder="Ad"
            width="45%"
            value={this.state.firstName}
          />
          <Input 
            onChangeText={this.onChangeText('lastName')} 
            type="lastName"
            placeholder="Soyad"
            width="45%"
            value={this.state.lastName}
          />
        </View>
        <Dropdown 
          defaultValue={this.state.school || 'Okul'}
          onSelect={this.onSelect('school')}
          options={this.schools} 
        />
        <Input 
          onChangeText={this.onChangeText('email')} 
          type='email'
          placeholder='E-posta'
          value={this.state.email}
        />
        <Input 
          onChangeText={this.onChangeText('password')} 
          type='password'
          placeholder='Şifre'
          value={this.state.password}
        />
        <Input 
          onChangeText={this.onChangeText('password2')} 
          type='password'
          placeholder="Şifre Doğrulama"
          value={this.state.password2}
        />
        <Button 
          text="Kayıt Ol" 
          onPress={this.register}
        />
        <View style={styles.aggrements}>
          <Text>Bu butona basarak</Text> 
          <TouchableOpacity onPress={() => Linking.openURL('https://www.bloomapp.tk/web/privacy-policy')}>
            <Text style={styles.agreementLink}> Gizlilik Sözleşmesi'ni </Text>
          </TouchableOpacity> 
          <Text>ve</Text> 
          <TouchableOpacity onPress={() => Linking.openURL('https://www.bloomapp.tk/web/terms')}>
            <Text style={styles.agreementLink}> Kullanım Şartları'nı </Text>
          </TouchableOpacity> 
          <Text>kabul etmiş olursunuz.</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  register: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  heading: {
    fontSize: 34,
    fontWeight: '900',
    color: '#16425B',
    flex: 1,
    marginLeft: 10
  },
  back: {
    width: 20,
    height: 20,
    marginRight: 'auto',
    marginTop: 5
  },
  halfInputs: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  aggrements: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    justifyContent: 'center'
  },
  agreementLink: {
    color: '#16425B'
  }
});