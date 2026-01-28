import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { colors, spacing, shadows } from '../theme/colors';
import { Button } from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const FeedbackScreen = ({ navigation }: any) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!text && rating === 0) return Alert.alert('Wait', 'Please provide some feedback.');
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert('Thank You', 'Your feedback helps us improve!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Feedback Matters 📝</Text>
      <Text style={styles.subtitle}>Help us serve you better.</Text>

      <Text style={styles.label}>Rate your experience</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((r) => (
          <TouchableOpacity key={r} onPress={() => setRating(r)}>
            <Icon 
              name={r <= rating ? "star" : "star-outline"} 
              size={40} 
              color={r <= rating ? "#FFC107" : colors.textLight} 
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Comments</Text>
      <View style={[styles.inputContainer, shadows.small]}>
        <TextInput
          style={styles.input}
          placeholder="Tell us what you like or want to improve..."
          placeholderTextColor={colors.textLight}
          multiline
          numberOfLines={4}
          value={text}
          onChangeText={setText}
        />
      </View>

      <Button 
        title="Submit Feedback" 
        onPress={handleSubmit} 
        loading={submitting}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: spacing.l,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.s,
    marginTop: spacing.m,
  },
  stars: {
    flexDirection: 'row',
    gap: spacing.m,
    marginBottom: spacing.l,
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.s,
    marginBottom: spacing.xl,
  },
  input: {
    textAlignVertical: 'top',
    fontSize: 16,
    color: colors.text,
    height: 120,
  },
});
