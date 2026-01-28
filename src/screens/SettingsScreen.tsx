import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors, spacing, shadows } from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SettingsScreen = ({ navigation }: any) => {
  const { language, setLanguage } = useApp();

  const languages = [
    { code: 'en', label: 'English', sub: 'Default' },
    { code: 'hi', label: 'हिन्दी', sub: 'Hindi' },
    { code: 'te', label: 'తెలుగు', sub: 'Telugu' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings ⚙️</Text>

      <TouchableOpacity 
        style={[styles.feedbackBtn, shadows.small]}
        onPress={() => navigation.navigate('Feedback')}
      >
        <Icon name="message-draw" size={24} color={colors.white} />
        <Text style={styles.feedbackText}>Send Feedback</Text>
      </TouchableOpacity>
      
      <Text style={styles.sectionHeader}>Language / भाषा</Text>
      <View style={styles.list}>
        {languages.map((lang) => (
          <TouchableOpacity 
            key={lang.code} 
            style={[
              styles.langItem, 
              language === lang.code && styles.activeItem,
              shadows.small
            ]}
            onPress={() => setLanguage(lang.code as any)}
          >
            <View>
              <Text style={[styles.langLabel, language === lang.code && styles.activeText]}>{lang.label}</Text>
              <Text style={styles.langSub}>{lang.sub}</Text>
            </View>
            {language === lang.code && <Icon name="check-circle" size={24} color={colors.white} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.m,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.l,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: spacing.m,
  },
  list: {
    gap: spacing.m,
  },
  langItem: {
    backgroundColor: colors.white,
    padding: spacing.m,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activeItem: {
    backgroundColor: colors.primary,
  },
  langLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  activeText: {
    color: colors.white,
  },
  langSub: {
    fontSize: 14,
    color: colors.textLight,
  },
  feedbackBtn: {
    backgroundColor: colors.secondary,
    padding: spacing.m,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.l,
    gap: spacing.s,
  },
  feedbackText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
