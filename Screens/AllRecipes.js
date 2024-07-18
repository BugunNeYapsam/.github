import * as React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RecipeCard from '../Components/RecipeCard';
import SearchBar from '../Components/SearchBar';
import { useNavigation, useLayoutEffect } from '@react-navigation/native';
import { useAppContext } from '../Context/AppContext';

export default function AllRecipes(props) {
  const { allRecipeData } = useAppContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [expandedCardIndex, setExpandedCardIndex] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState('none'); // 'none', 'asc', 'desc'

  const sortRecipes = (recipes, order) => {
    if (order === 'asc') {
      return recipes.sort((a, b) => a.isim.localeCompare(b.isim));
    } else if (order === 'desc') {
      return recipes.sort((a, b) => b.isim.localeCompare(a.isim));
    }
    return recipes;
  };

  const filteredRecipes = allRecipeData.filter(r => r.isim.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedRecipes = sortRecipes(filteredRecipes, sortOrder);

  const toggleExpand = (index) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  const handleSort = () => {
    setSortOrder(prevOrder => {
      if (prevOrder === 'none') return 'asc';
      if (prevOrder === 'asc') return 'desc';
      return 'none';
    });
  };

  const navigation = useNavigation();

  // Başlık çubuğunu gizlemek için navigation.setOptions kullanabilirsiniz
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#bbd0c4', '#a1d0c4', '#bbd0c4']} // Gradient colors
      style={styles.gradient}
    >
      <View style={styles.container}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSortPress={handleSort} sortOrder={sortOrder} />
        <ScrollView>
          {sortedRecipes.map((r, index) => (
            <RecipeCard
              key={index}
              foodName={r.isim}
              ingredients={r.malzemeler}
              recipeSteps={r.tarif} // Assuming recipe steps are now an array
              imageUrl={"https://picsum.photos/200/300"}
              expanded={expandedCardIndex === index}
              toggleExpand={() => toggleExpand(index)}
            />
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
