  import React from 'react';
  import { View, StyleSheet } from 'react-native';

  const Card = ({ children, style = {} }) => (  // Props: children (konten), style (opsional override)
    <View style={[styles.card, style]}>
      {children}
    </View>
  );

  const styles = StyleSheet.create({
    card: { backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5, borderColor: 'rgba(255,255,255,0.5)', borderWidth: 1 },  // Semi-transparent white, rounded, shadow, border
  });

  export default Card;