import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Используем SVG-файлы из assets как изображения
  const EyeIcon = () => (
    <Image source={require('../assets/eye-fill.svg')} style={{ width: 24, height: 24 }} />
  );

  const EyeSlashIcon = () => (
    <Image source={require('../assets/eye-slash-fill.svg')} style={{ width: 24, height: 24 }} />
  );

  // Validate email on blur
  const handleEmailBlur = () => {
    // Check max length
    if (email.length > 100) {
      setEmailError('Email не должен превышать 100 символов');
      return;
    }

    // RFC email format validation using regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Пожалуйста, введите действительный email адрес');
      return;
    }

    // Clear error if validation passes
    setEmailError('');
  };

  // Validate email and password before login
  const handleLogin = () => {
    // Check max length for email
    if (email.length > 100) {
      setEmailError('Email не должен превышать 100 символов');
      return;
    }

    // Check empty email
    if (!email) {
      setEmailError('Пожалуйста, введите email');
      return;
    }
    
    // RFC email format validation using regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Пожалуйста, введите действительный email адрес');
      return;
    }

    // Clear email error if validation passes
    setEmailError('');

    // Check length for password
    if (password.length < 8) {
      setPasswordError('Пароль должен содержать минимум 8 символов');
      return;
    }

    if (password.length > 40) {
      setPasswordError('Пароль не должен превышать 40 символов');
      return;
    }

    // Check for at least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
      setPasswordError('Пароль должен содержать минимум 1 заглавную букву');
      return;
    }

    // Check for at least one lowercase letter
    const hasLowerCase = /[a-z]/.test(password);
    if (!hasLowerCase) {
      setPasswordError('Пароль должен содержать минимум 1 прописную букву');
      return;
    }

    // Check for at least one digit
    const hasDigit = /\d/.test(password);
    if (!hasDigit) {
      setPasswordError('Пароль должен содержать минимум 1 цифру');
      return;
    }

    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    if (!hasSpecialChar) {
      setPasswordError('Пароль должен содержать минимум 1 специальный символ !@#$%^&*');
      return;
    }

    // Clear password error if validation passes
    setPasswordError('');
  };

  // Validate password on blur
  const handlePasswordBlur = () => {
    // Check length
    if (password.length < 8) {
      setPasswordError('Пароль должен содержать минимум 8 символов');
      return;
    }

    if (password.length > 40) {
      setPasswordError('Пароль не должен превышать 40 символов');
      return;
    }

    // Check for at least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
      setPasswordError('Пароль должен содержать минимум 1 заглавную букву');
      return;
    }

    // Check for at least one lowercase letter
    const hasLowerCase = /[a-z]/.test(password);
    if (!hasLowerCase) {
      setPasswordError('Пароль должен содержать минимум 1 прописную букву');
      return;
    }

    // Check for at least one digit
    const hasDigit = /\d/.test(password);
    if (!hasDigit) {
      setPasswordError('Пароль должен содержать минимум 1 цифру');
      return;
    }

    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    if (!hasSpecialChar) {
      setPasswordError('Пароль должен содержать минимум 1 специальный символ');
      return;
    }

    // Clear error if validation passes
    setPasswordError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Войти</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onBlur={handleEmailBlur}
        onFocus={() => setEmailError('')} // Clear email error when input is focused
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          onBlur={handlePasswordBlur}
          onFocus={() => setPasswordError('')} // Clear password error when input is focused
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
        </TouchableOpacity>
      </View>
      
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.link}>Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: "#6b7280ff",
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    padding: 15,
    paddingRight: 50,
    color: "#6b7280ff",
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    color: '#007AFF',
    marginTop: 15,
    fontSize: 16,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default LoginScreen;