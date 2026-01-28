import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { colors, spacing, shadows } from '../theme/colors';
import { Button } from '../components/Button';
import { APIService } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const PestDetectionScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCapture = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.8,
        saveToPhotos: false,
      });

      if (result.didCancel) {
        return;
      }

      if (result.errorMessage) {
        Alert.alert('Error', result.errorMessage);
        return;
      }

      const asset = result.assets?.[0];
      if (asset?.uri) {
        setImage(asset.uri);
        setResult(null); // Reset previous result
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    try {
      // Mock API call which now returns Wheat Rust deterministically
      const diagnosis = await APIService.analyzeCropImage(image);
      setResult(diagnosis);
    } catch (e) {
      Alert.alert('Error', 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>Pest & Disease Detector 🔍</Text>
      
      <View style={[styles.imageContainer, shadows.medium]}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="camera-plus" size={48} color={colors.textLight} />
            <Text style={styles.placeholderText}>Take Photo of Affected Crop</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <Button 
          title={image ? "Retake Photo" : "Take Photo"} 
          onPress={handleCapture} 
          variant="outline" 
          style={{ flex: 1, marginRight: spacing.s }}
        />
        {image && (
          <Button 
            title="Analyze" 
            onPress={handleAnalyze} 
            loading={analyzing} 
            style={{ flex: 1, marginLeft: spacing.s }}
          />
        )}
      </View>

      {result && (
        <View style={[styles.resultBox, result.healthy ? styles.healthy : styles.danger, shadows.small]}>
          <View style={styles.resultHeader}>
             <Icon 
               name={result.healthy ? "flower" : "alert-circle"} 
               size={28} 
               color={result.healthy ? colors.success : colors.error} 
             />
             <Text style={[styles.diagnosisTitle, { color: result.healthy ? colors.success : colors.error }]}>
               {result.healthy ? 'Healthy Crop' : result.disease}
             </Text>
          </View>
          
          {!result.healthy && (
            <View>
              <Text style={styles.confidence}>Confidence: {(result.confidence * 100).toFixed(0)}%</Text>
              
              <View style={styles.section}>
                <Text style={styles.treatmentHeader}>Remedy & Treatment:</Text>
                <Text style={styles.treatment}>{result.treatment}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.treatmentHeader}>Prevention Tips:</Text>
                <Text style={styles.treatment}>
                  • Rotate crops annually.{'\n'}
                  • Use resistant varieties.{'\n'}
                  • Monitor fields regularly for early signs.
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
      <View style={{ height: 40 }} /> 
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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.l,
    textAlign: 'center',
  },
  imageContainer: {
    height: 350,
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: spacing.l,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  placeholderText: {
    marginTop: spacing.s,
    color: colors.textLight,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    marginBottom: spacing.l,
  },
  resultBox: {
    backgroundColor: colors.white,
    padding: spacing.m,
    borderRadius: 16,
  },
  healthy: {
    borderLeftWidth: 5,
    borderLeftColor: colors.success,
  },
  danger: {
    borderLeftWidth: 5,
    borderLeftColor: colors.error,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  diagnosisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: spacing.s,
    flex: 1,
  },
  confidence: {
    color: colors.textLight,
    marginBottom: spacing.m,
    fontSize: 14,
  },
  section: {
    marginBottom: spacing.m,
  },
  treatmentHeader: {
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
    fontSize: 16,
  },
  treatment: {
    color: colors.text,
    lineHeight: 22,
    fontSize: 15,
  },
});
