import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../Context/AppContext';

const Categories = ({ showAll, isDarkMode }) => {
  const navigation = useNavigation();
  const { allCategoriesData, selectedLanguage, languageStore } = useAppContext();
  const [loading, setLoading] = useState(true);
  const shimmerValue = useRef(new Animated.Value(0)).current;
  
  const dynamicPageTitleStyle = {
    color: isDarkMode ? '#c781a4' : '#444'
  };

  const dynamicSeeAllStyle = {
    color: isDarkMode ? '#5c86ff' : '#0445ff'
  };
  
  useEffect(() => {
    if (allCategoriesData && allCategoriesData.length > 0) {
      setLoading(false);
    }

    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [allCategoriesData, shimmerValue]);

  const renderPlaceholders = () => {
    const placeholders = new Array(6).fill(0);
    return placeholders.map((_, index) => (
      <View key={index} style={styles.placeholderCard}>
        <Animated.View style={[styles.placeholderImage, { opacity: shimmerValue }]} />
        <View style={styles.placeholderOverlay}>
          <Animated.View style={[styles.placeholderText, { opacity: shimmerValue }]} />
        </View>
      </View>
    ));
  };

  if (showAll) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.grid}>
          {loading ? renderPlaceholders() : allCategoriesData?.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>{category.name[selectedLanguage]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, dynamicPageTitleStyle]}>{languageStore[selectedLanguage]["categories"]}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(languageStore[selectedLanguage]["all_categories"])}>
          <Text style={[styles.seeAll, dynamicSeeAllStyle]}>{languageStore[selectedLanguage]["see_all"]}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal style={styles.horizontalScroll} showsHorizontalScrollIndicator={false}>
        {loading ? renderPlaceholders() : allCategoriesData?.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryName}>{category.name[selectedLanguage]}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: 'blue',
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  categoryCard: {
    width: 120,
    height: 160,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: '#E3E3E3',
    borderWidth: 0.5,
    borderColor: '#6B2346',
    shadowColor: '#6B2346',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  categoryImage: {
    width: '100%',
    height: '85%',
    resizeMode: 'cover',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  categoryName: {
    color: '#2A2A2A',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: "#E3E3E3",
    paddingHorizontal: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: "25%"
  },
  placeholderCard: {
    width: 120,
    height: 180,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    elevation: 2,
  },
  placeholderImage: {
    width: '100%',
    height: '75%',
    backgroundColor: '#D0D0D0',
  },
  placeholderOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    width: '60%',
    height: 20,
    backgroundColor: '#C0C0C0',
    borderRadius: 4,
  },
});

export default Categories;