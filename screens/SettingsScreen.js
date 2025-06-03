import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const [name, setName] = useState('Nombre de Usuario'); // Estado para el nombre
  const [profileImage, setProfileImage] = useState('https://cdn-icons-png.flaticon.com/512/149/149071.png'); // Estado para la foto de perfil

  const handleLogout = () => {
    // Lógica para cerrar sesión (cuando el backend esté implementado)
    console.log('Cerrar sesión');
    // navigation.navigate('Login'); // Navegar a la pantalla de login
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajustes</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => console.log('Cambiar foto')}> {/* Placeholder para cambiar foto */}
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.changeImageOverlay}>
            <FontAwesome name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
          placeholder="Nombre de Usuario"
          placeholderTextColor="#ccc"
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1c1c1c',
    paddingTop: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  changeImageOverlay: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    padding: 5,
  },
  nameInput: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    width: '80%',
  },
  logoutButton: {
    backgroundColor: '#FF6347', // Color rojo para el botón de cerrar sesión
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 'auto', // Empuja el botón al final de la pantalla
    marginBottom: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen; 