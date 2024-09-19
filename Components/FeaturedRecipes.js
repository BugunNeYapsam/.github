import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../Context/AppContext';

const FeaturedRecipes = ({ showAll, isDarkMode }) => {
    const navigation = useNavigation();
    const { featuredRecipes, selectedLanguage, languageStore } = useAppContext();

    const dynamicPageTitleStyle = {
      color: isDarkMode ? '#c781a4' : '#444'
    };
  
    const dynamicSeeAllStyle = {
      color: isDarkMode ? '#5c86ff' : '#0445ff'
    };
    
    if (showAll) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.grid}>
            {featuredRecipes?.map((recipe, index) => (
              <TouchableOpacity key={index} style={styles.recipeCard}>
                <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
                <Text style={styles.recipeName}>{recipe.isim}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      );
    }
  
    return (
      <View>
        <View style={styles.header}>
          <Text style={[styles.sectionTitle, dynamicPageTitleStyle]}>{languageStore[selectedLanguage]["featured_recipes"]}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(languageStore[selectedLanguage]["all_featured_recipes"])}>
            <Text style={[styles.seeAll, dynamicSeeAllStyle]}>{languageStore[selectedLanguage]["see_all"]}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={styles.horizontalScroll} showsHorizontalScrollIndicator={false}>
          {featuredRecipes?.map((recipe, index) => (
            <TouchableOpacity key={index} style={styles.featuredCard}>
              <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
              <View style={styles.featuredOverlay}>
                <Text style={styles.featuredName}>{recipe.isim}</Text>
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
    featuredCard: {
      width: 200,
      height: 150,
      marginRight: 10,
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 2,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      borderWidth: 0.5,
      borderColor: '#6B2346',
      shadowColor: '#6B2346',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 6
    },
    featuredImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    featuredOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 10,
    },
    featuredName: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingBottom: "25%"
    },
    recipeCard: {
      width: '48%',
      marginBottom: 10,
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 2,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    recipeImage: {
      width: '100%',
      height: 150,
      resizeMode: 'cover',
    },
    recipeName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 5,
      textAlign: 'center',
    },
  });
  
  export default FeaturedRecipes;