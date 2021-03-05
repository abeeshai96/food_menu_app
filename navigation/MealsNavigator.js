import { Platform, Text } from 'react-native';
import React from 'react'

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltesScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const MealsNavigator = createStackNavigator({
    Categoires: {
        screen: CategoriesScreen,
        //navigationOptions: {
        //    headerTitle: 'Meals Category'
        //}
    },

    CategoryMeals: CategoryMealsScreen,

    MealDetail: MealDetailScreen
}, { defaultNavigationOptions: defaultStackNavOptions }
);

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, { defaultNavigationOptions: defaultStackNavOptions }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
                );
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' 
            ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text>
            : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
                );
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' 
            ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text>
            : 'Favorites'
        }
    }
}

const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        //barStyle: {
        //    backgroundColor: Colors.primaryColor
        //}

    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.accentColor
        }
    });

const FiltersNavigator = createStackNavigator({
    Filters: FiltesScreen
}, { defaultNavigationOptions: defaultStackNavOptions }
);

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator, navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: {
        screen: FiltersNavigator, navigationOptions: {
            drawerLabel: 'Filters'
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 18
        }
    }
});

export default createAppContainer(MainNavigator);