import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const RegistrationScreen = () => {
  // Состояния для управления этапами
  const [currentStep, setCurrentStep] = useState(1); // 1 - первый этап, 2 - второй этап
  
  // Состояния для данных формы
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Состояния для ошибок
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Используем SVG-файлы из assets как изображения
  const EyeIcon = () => (
    <Image source={require('../assets/eye-fill.svg')} style={{ width: 24, height: 24 }} />
  );

  const EyeSlashIcon = () => (
    <Image source={require('../assets/eye-slash-fill.svg')} style={{ width: 24, height: 24 }} />
  );

  // Валидация email (как в LoginScreen)
  const validateEmail = (email: string) => {
    // Check max length
    if (email.length > 100) {
      setEmailError('Email не должен превышать 100 символов');
      return false;
    }

    // RFC email format validation using regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Пожалуйста, введите действительный email адрес');
      return false;
    }

    // Clear error if validation passes
    setEmailError('');
    return true;
  };

  // Валидация пароля (как в LoginScreen)
  const validatePassword = (password: string) => {
    // Check length
    if (password.length < 8) {
      setPasswordError('Пароль должен содержать минимум 8 символов');
      return false;
    }

    if (password.length > 40) {
      setPasswordError('Пароль не должен превышать 40 символов');
      return false;
    }

    // Check for at least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
      setPasswordError('Пароль должен содержать минимум 1 заглавную букву');
      return false;
    }

    // Check for at least one lowercase letter
    const hasLowerCase = /[a-z]/.test(password);
    if (!hasLowerCase) {
      setPasswordError('Пароль должен содержать минимум 1 прописную букву');
      return false;
    }

    // Check for at least one digit
    const hasDigit = /\d/.test(password);
    if (!hasDigit) {
      setPasswordError('Пароль должен содержать минимум 1 цифру');
      return false;
    }

    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    if (!hasSpecialChar) {
      setPasswordError('Пароль должен содержать минимум 1 специальный символ');
      return false;
    }

    // Clear error if validation passes
    setPasswordError('');
    return true;
  };

  // Обработчик потери фокуса для email
  const handleEmailBlur = () => {
    validateEmail(email);
  };

  // Обработчик потери фокуса для пароля
  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  // Обработчик потери фокуса для подтверждения пароля
  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Пароли не совпадают');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };

  // Обработчик перехода к следующему этапу
  const handleContinue = () => {
    if (currentStep === 1) {
      // Валидация email перед переходом ко второму этапу
      if (validateEmail(email)) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      // Валидация паролей перед регистрацией
      const isPasswordValid = validatePassword(password);
      const isConfirmPasswordValid = password === confirmPassword;
      
      if (!isConfirmPasswordValid) {
        setConfirmPasswordError('Пароли не совпадают');
      }
      
      if (isPasswordValid && isConfirmPasswordValid) {
        // Здесь будет логика регистрации
        console.log('Регистрация:', { email, password });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {currentStep === 1 ? 'Регистрация - Шаг 1' : 'Регистрация - Шаг 2'}
      </Text>
      
      {currentStep === 1 ? (
        // Первый этап - ввод email
        <>
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
          
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Продолжить</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Второй этап - ввод пароля и подтверждения
        <>
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
          
          <TextInput
            style={styles.input}
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onBlur={handleConfirmPasswordBlur}
            onFocus={() => setConfirmPasswordError('')} // Clear confirm password error when input is focused
            secureTextEntry
          />
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
          
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </>
      )}
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
  eyeButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default RegistrationScreen;