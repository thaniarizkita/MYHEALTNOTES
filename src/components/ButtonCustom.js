import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ButtonCustom = ({ children, onPress, variant = 'primary', iconName, style, textStyle }) => {
  const variants = {
    primary: styles.buttonPrimary,
    secondary: styles.buttonSecondary,
    danger: styles.buttonDanger,
  };
  
  const textVariants = {
    primary: styles.buttonTextPrimary,
    secondary: styles.buttonTextSecondary,
    danger: styles.buttonTextDanger,
  };
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.buttonBase, variants[variant], style]}
      activeOpacity={0.7}
    > 
      {iconName && <Ionicons name={iconName} size={18} color="white" />} 
      <Text style={[styles.buttonText, textVariants[variant], textStyle]}>
        {children}
      </Text>  
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 12, 
    marginVertical: 4 
  },
  buttonPrimary: { 
    backgroundColor: '#3b82f6' 
  },  
  buttonSecondary: { 
    backgroundColor: '#6b7280' 
  },
  buttonDanger: { 
    backgroundColor: '#dc2626' 
  },
  buttonText: { 
    fontWeight: '600', 
    marginLeft: 8,
    fontSize: 14 
  },
  buttonTextPrimary: { 
    color: 'white' 
  },
  buttonTextSecondary: { 
    color: 'white' 
  },
  buttonTextDanger: { 
    color: 'white' 
  },
});

export default ButtonCustom;