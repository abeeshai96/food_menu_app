import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from './MealItem';

const MealList = props => {
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals);


    const renderMealItem = itemData => {
        const isFavorite = currentMealIsFavorite.some(meal => meal.id === itemData.item.id);
        return (
            <MealItem
                title={itemData.item.title}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail',
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite
                        }
                    });
                }}
            />
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={props.listData}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MealList;