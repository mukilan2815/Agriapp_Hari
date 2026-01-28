import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { colors, spacing, shadows } from '../theme/colors';
import { APIService } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const MarketScreen = () => {
  const [prices, setPrices] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPrices = async () => {
    setRefreshing(true);
    const data = await APIService.getMarketPrices('Punjab');
    setPrices(data);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.card, shadows.small]}>
      <View style={styles.iconBox}>
         <Icon name="sprout-outline" size={24} color={colors.primary} />
      </View>
      <View style={styles.details}>
        <Text style={styles.cropName}>{item.crop}</Text>
        <Text style={styles.location}>Mandi: Ludhiana</Text>
      </View>
      <View style={styles.priceBox}>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.trend}>
          <Icon 
            name={item.trend === 'up' ? 'arrow-up-bold' : item.trend === 'down' ? 'arrow-down-bold' : 'minus'} 
            size={16} 
            color={item.trend === 'up' ? colors.success : item.trend === 'down' ? colors.error : colors.textLight} 
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Market Prices 📈</Text>
        <Text style={styles.subtitle}>Real-time Mandi Rates</Text>
      </View>
      <FlatList
        data={prices}
        renderItem={renderItem}
        keyExtractor={item => item.crop}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchPrices} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.m,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    color: colors.textLight,
  },
  list: {
    padding: spacing.m,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.m,
    marginBottom: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.m,
  },
  details: {
    flex: 1,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  location: {
    fontSize: 12,
    color: colors.textLight,
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  trend: {
    marginTop: 4,
  },
});
