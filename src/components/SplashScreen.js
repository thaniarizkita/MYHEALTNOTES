import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ButtonCustom from './ButtonCustom';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onContinue }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const heartBeatAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Main entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 65,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Heartbeat animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartBeatAnim, {
          toValue: 1.15,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(heartBeatAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
      { delay: 800 }
    ).start();

    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Rotate animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 360,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  const rotateDeg = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#e0f2fe', '#fef3c7', '#e0f2fe']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Decorative floating elements */}
      <View style={styles.decorativeContainer}>
        <Animated.View
          style={[
            styles.floatingCircle,
            styles.circle1,
            {
              transform: [
                { translateY: Animated.add(floatAnim, 0) },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.floatingCircle,
            styles.circle2,
            {
              transform: [
                { translateY: Animated.add(floatAnim, -20) },
              ],
            },
          ]}
        />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentWrapper}>
          {/* Top spacing */}
          <View style={styles.topSpacer} />

          {/* Main content card */}
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }, { translateY }],
              },
            ]}
          >
            {/* Animated glow background */}
            <Animated.View
              style={[
                styles.glowBackground,
                {
                  opacity: glowOpacity,
                  transform: [{ scale: glowScale }],
                },
              ]}
            />

            {/* Icon section with rotating border */}
            <View style={styles.iconSection}>
              <Animated.View
                style={[
                  styles.iconOuterWrapper,
                  {
                    transform: [{ rotate: rotateDeg }],
                  },
                ]}
              >
                <View style={styles.rotatingBorder} />
              </Animated.View>

              <Animated.View
                style={[
                  styles.iconWrapper,
                  {
                    transform: [{ scale: heartBeatAnim }],
                  },
                ]}
              >
                <LinearGradient
                  colors={['#3b82f6', '#0ea5e9', '#06b6d4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientIcon}
                >
                  <Ionicons name="heart" size={70} color="#fff" />
                </LinearGradient>
              </Animated.View>
            </View>

            {/* Title */}
            <Text style={styles.title}>MYHEALTNOTES</Text>

            {/* Animated subtitle */}
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={styles.subtitle}>
                Your personal health companion for a better lifestyle
              </Text>
            </Animated.View>

            {/* Decorative line */}
            <View style={styles.decorativeLine} />
          </Animated.View>

          {/* Feature badges */}
          <View style={styles.badgesContainer}>
            <View style={styles.badge}>
              <Ionicons name="checkmark-circle" size={14} color="#0ea5e9" />
              <Text style={styles.badgeText}>Smart Tracking</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="shield-checkmark" size={14} color="#0ea5e9" />
              <Text style={styles.badgeText}>Secure</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="flash" size={14} color="#0ea5e9" />
              <Text style={styles.badgeText}>Fast</Text>
            </View>
          </View>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacer} />

          {/* Button */}
          <View style={styles.buttonContainer}>
            <ButtonCustom onPress={onContinue} iconName="arrow-forward">
              Get Started
            </ButtonCustom>
          </View>

          {/* Extra bottom padding */}
          <View style={styles.extraPadding} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  decorativeContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  floatingCircle: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.08,
  },
  circle1: {
    width: 300,
    height: 300,
    backgroundColor: '#3b82f6',
    top: -100,
    right: -100,
  },
  circle2: {
    width: 200,
    height: 200,
    backgroundColor: '#0ea5e9',
    bottom: -50,
    left: -50,
  },
  topSpacer: {
    height: height * 0.05,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 15 },
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'visible', // PENTING: ubah dari 'hidden' ke 'visible'
  },
  glowBackground: {
    position: 'absolute',
    width: 250,
    height: 250,
    backgroundColor: '#3b82f6',
    borderRadius: 125,
    top: -125,
    left: '50%',
    marginLeft: -125,
    opacity: 0,
  },
  iconSection: {
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconOuterWrapper: {
    position: 'absolute',
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotatingBorder: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderTopColor: '#3b82f6',
    borderRightColor: '#0ea5e9',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
  },
  gradientIcon: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 2,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    fontWeight: '500',
  },
  decorativeLine: {
    width: 50,
    height: 3,
    backgroundColor: 'rgba(59, 130, 246, 0.4)',
    borderRadius: 2,
    marginTop: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
  },
  badgeText: {
    fontSize: 11,
    color: '#0891b2',
    marginLeft: 4,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: height * 0.02,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  extraPadding: {
    height: 16,
  },
});

export default SplashScreen;