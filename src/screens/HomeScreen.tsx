import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, shadows } from '../theme/colors';
import { GradientCard } from '../components/GradientCard';
import { APIService } from '../services/api';
import { useApp } from '../context/AppContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { userLocation, language } = useApp();
  const [weather, setWeather] = useState<any>(null);

  const greetings = {
    en: 'Namaste, Farmer 🙏',
    hi: 'नमस्ते किसान 🙏',
    te: 'నమస్కారం రైతు 🙏'
  };

  useEffect(() => {
    APIService.getWeather(userLocation).then(setWeather);
  }, [userLocation]);

  const renderServiceCard = (title: string, icon: string, color: string, route: string) => (
    <TouchableOpacity 
      style={[styles.serviceCard, shadows.small]}
      onPress={() => navigation.navigate(route)}
    >
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={32} color={color} />
      </View>
      <Text style={styles.serviceTitle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greetings[language] || greetings.en}</Text>
          <Text style={styles.location}><Icon name="map-marker" size={14} /> {userLocation}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
             <Icon name="cog" size={24} color={colors.textLight} />
        </TouchableOpacity>
      </View>



      {/* Weather Alert Simulation */}
      {weather && weather.forecast.some((d: any) => d.icon.includes('rain')) && (
        <View style={styles.alertCard}>
           <Icon name="alert-decagram" size={24} color={colors.white} />
           <Text style={styles.alertText}>Alert: Heavy rain expected on Wednesday. Secure your harvest!</Text>
        </View>
      )}

      {/* Weather Card */}
      <GradientCard style={styles.weatherCard}>
        {weather ? (
          <>
            <View style={styles.weatherRow}>
              <View>
                <Text style={styles.temp}>{weather.temp}°C</Text>
                <Text style={styles.condition}>{weather.condition}</Text>
              </View>
              <Icon name="weather-partly-cloudy" size={48} color={colors.white} />
            </View>
            <View style={styles.weatherDetails}>
                <Text style={styles.detailText}><Icon name="water-percent" color="white" /> {weather.humidity}% Humidity</Text>
                <Text style={styles.detailText}><Icon name="weather-windy" color="white" /> {weather.wind}</Text>
            </View>
            <View style={styles.aiInsight}>
              <Icon name="robot" size={16} color={colors.white} />
              <Text style={styles.aiText}> AI: {weather.aiInsight}</Text>
            </View>
          </>
        ) : (
          <Text style={{color: 'white'}}>Loading Weather...</Text> 
        )}
      </GradientCard>

      {/* Services Grid */}
      <Text style={styles.sectionTitle}>Smart Services</Text>
      <View style={styles.grid}>
        {renderServiceCard('Crop Advisory', 'sprout', colors.primary, 'Advisory')}
        {renderServiceCard('Pest Detect', 'camera-iris', '#E91E63', 'PestDetection')}
        {renderServiceCard('Market Prices', 'chart-line', '#2196F3', 'Market')}
        {renderServiceCard('Voice Helper', 'microphone', '#FF9800', 'VoiceBot')}
      </View>

      {/* Quick Tips */}
      <Text style={styles.sectionTitle}>Daily Insight</Text>
      <View style={[styles.tipCard, shadows.small]}>
          <Text style={styles.tipText}>
            Did you know? Rotating crops between deep-rooted and shallow-rooted plants improves soil structure.
          </Text>
      </View>
    </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: spacing.m,
  },
  alertCard: {
    backgroundColor: colors.error,
    padding: spacing.m,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
    gap: spacing.s,
  },
  alertText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  location: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  weatherCard: {
    marginBottom: spacing.l,
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temp: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.white,
  },
  condition: {
    fontSize: 18,
    color: colors.white,
    opacity: 0.9,
  },
  weatherDetails: {
    flexDirection: 'row',
    marginTop: spacing.m,
    gap: spacing.m,
  },
  detailText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginRight: spacing.m,
  },
  aiInsight: {
    marginTop: spacing.m,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: spacing.s,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiText: {
    color: colors.white,
    fontSize: 13,
    marginLeft: spacing.xs,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.m,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.l,
  },
  serviceCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.m,
    marginBottom: spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.s,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  tipCard: {
    backgroundColor: '#FFF8E1',
    padding: spacing.m,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  tipText: {
    color: colors.text,
    lineHeight: 22,
  },
});
