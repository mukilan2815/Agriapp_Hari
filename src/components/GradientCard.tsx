import React from 'react';
import { StyleSheet, View, ViewStyle, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, shadows, spacing } from '../theme/colors';

interface GradientCardProps {
  children: React.ReactNode;
  colors?: string[];
  style?: ViewStyle;
  onPress?: () => void;
}

export const GradientCard: React.FC<GradientCardProps> = ({ 
  children, 
  colors: gradientColors = [colors.gradientStart, colors.gradientEnd],
  style 
}) => {
  return (
    <View style={[styles.container, shadows.medium, style]}>
      <LinearGradient 
        colors={gradientColors} 
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 1}}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginVertical: spacing.s,
    backgroundColor: colors.white, // Fallback
  },
  gradient: {
    borderRadius: 16,
    padding: spacing.m,
  },
});
