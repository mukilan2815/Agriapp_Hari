import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { colors, spacing, shadows } from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { APIService } from '../services/api';

export const VoiceBotScreen = () => {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const startListening = () => {
    setListening(true);
    setResponse(null);
    
    // Simulate listening delay + processing
    setTimeout(async () => {
      setListening(false);
      const advice = await APIService.getAdvisory('Voice Query: "Best fertilizer for cotton"');
      setResponse(advice.answer);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kisan Voice Assistant 🎙️</Text>
      <Text style={styles.subtitle}>Tap the mic and speak in your language.</Text>

      <View style={styles.micContainer}>
        <TouchableOpacity 
          style={[styles.micButton, listening && styles.micActive, shadows.medium]}
          onPress={startListening}
        >
          <Icon name="microphone" size={64} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.status}>{listening ? 'Listening...' : 'Tap to Speak'}</Text>
      </View>

      {response && (
        <View style={[styles.responseCard, shadows.small]}>
           <Text style={styles.responseText}>{response}</Text>
           <TouchableOpacity onPress={() => setResponse(null)} style={styles.closeBtn}>
             <Text style={styles.closeText}>Close</Text>
           </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.s,
    marginTop: -80,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  micContainer: {
    alignItems: 'center',
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.l,
  },
  micActive: {
    backgroundColor: colors.error,
    transform: [{ scale: 1.1 }],
  },
  status: {
    fontSize: 18,
    color: colors.textLight,
  },
  responseCard: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: colors.white,
    padding: spacing.m,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    marginBottom: spacing.s,
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
  closeText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
