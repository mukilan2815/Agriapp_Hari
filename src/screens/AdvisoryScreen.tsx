import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { colors, spacing, shadows } from '../theme/colors';
import { Button } from '../components/Button';
import { APIService } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AdvisoryScreen = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGetAdvice = async () => {
    if (!query) return Alert.alert('Error', 'Please enter a concern or crop name.');
    setLoading(true);
    try {
      const resp = await APIService.getAdvisory(query);
      setResult(resp);
    } catch (e) {
      Alert.alert('Error', 'Failed to get advisory.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Crop Advisory 🌾</Text>
        <Text style={styles.subtitle}>
          Get personalized scientific advice for your soil and crops.
        </Text>

        <View style={[styles.inputContainer, shadows.small]}>
            <TextInput
              style={styles.input}
              placeholder="e.g., 'Yellow spots on Wheat leaves', 'Fertilizer for Rice'"
              placeholderTextColor={colors.textLight}
              multiline
              numberOfLines={3}
              value={query}
              onChangeText={setQuery}
            />
        </View>

        <Button 
          title="Get Expert Advice" 
          onPress={handleGetAdvice} 
          loading={loading}
          style={styles.button}
        />

        {result && (
          <View style={[styles.resultCard, shadows.medium]}>
            <View style={styles.resultHeader}>
              <Icon name="check-decagram" size={24} color={colors.primary} />
              <Text style={styles.resultTitle}>Recommendation</Text>
            </View>
            <Text style={styles.resultText}>{result.answer}</Text>
            
            <View style={styles.sourceContainer}>
              <Text style={styles.sourceLabel}>Sources:</Text>
              {result.sources.map((s: string, i: number) => (
                <Text key={i} style={styles.sourceTag}>{s}</Text>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.m,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: spacing.l,
    lineHeight: 22,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.s,
    marginBottom: spacing.m,
  },
  input: {
    fontSize: 16,
    color: colors.text,
    textAlignVertical: 'top',
    height: 100,
  },
  button: {
    marginBottom: spacing.l,
  },
  resultCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.m,
    borderTopWidth: 4,
    borderTopColor: colors.secondary,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: spacing.s,
    color: colors.text,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    marginBottom: spacing.m,
  },
  sourceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  sourceLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginRight: 4,
  },
  sourceTag: {
    fontSize: 12,
    color: colors.primary,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
