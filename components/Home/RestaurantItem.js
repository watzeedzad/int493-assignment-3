import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from "react-native-paper";

export class RestaurantItem extends Component {
    render() {
        const { restaurantName, restaurantRating, restaurantTypeDesc } = this.props.item
        return (
            <TouchableOpacity onPress={() => this.props.onPress(this.props.item)}>
                <Card style={styles.card} elevation={3}>
                    <Text>Name : {restaurantName}</Text>
                    <Text>Rating : {restaurantRating}</Text>
                    <Text>Type : {restaurantTypeDesc}</Text>
                </Card>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: 350,
        height: 200,
        margin: 10,
        alignItems: "center"
    }
});

export default RestaurantItem
