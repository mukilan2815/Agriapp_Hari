import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, shadows } from '../theme/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false,
  style
}) => {
  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={loading} style={[styles.wrapper, style, shadows.small]}>
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.textPrimary}>{title}</Text>}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={loading} 
      style={[
        styles.wrapper, 
        variant === 'outline' ? styles.outline : styles.secondary,
        style
      ]}
    >
       {loading ? <ActivityIndicator color={colors.primary} /> : 
         <Text style={variant === 'outline' ? styles.textOutline : styles.textSecondary}>{title}</Text>
       }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    marginVertical: spacing.xs,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
    paddingVertical: 12.5, // compensative border
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPrimary: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  textSecondary: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  textOutline: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
  },
});
