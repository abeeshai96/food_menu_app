import React, { useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};

const MealDetailScreen = props => {

    const mealId = props.navigation.getParam('mealId');
    const availableMeals = useSelector(state => state.meals.meals);
    const currentMealIsFavorite = useSelector(
        state => state.meals.favoriteMeals.some(meal => meal.id === mealId)
    );

    const selectedMeal = availableMeals.find(
        meal => meal.id === mealId
    );

    const dispactch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispactch(toggleFavorite(mealId));
    }, [dispactch, mealId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [toggleFavoriteHandler]);

    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite });
    }, [currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = navigationData => {
    const isFavorite = navigationData.navigation.getParam('isFav');

    // const mealId = navigationData.navigation.getParam('mealId');

    // const selectedMeal = MEALS.find(
    //     meal => meal.id === mealId
    // );

    return {
        headerTitle: navigationData.navigation.getParam('mealTitle'),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Favourite"
                    iconName={isFavorite ? "ios-star" : "ios-star-outline"}
                    onPress={navigationData.navigation.getParam('toggleFav')}
                />
            </HeaderButtons>
        )
    };
};


const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },

    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },

    image: {
        width: '100%',
        height: 200
    },

    listItem: {
        marginVertical: 5,
        marginHorizontal: 20,
        // borderColor: '#ccc',
        // borderWidth: 1,
        padding: 5
    }
});

export default MealDetailScreen;