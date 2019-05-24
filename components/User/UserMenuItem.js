//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// create a component
class UserMenuItem extends Component {
    constructor(props) {
      super(props)
    
      this.state = {

      };
    };
    
    componentDidMount() {

    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                activeOpacity={0.5}
            >
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={this.props.iconImage}
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.text}> {this.props.text} </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
    },
    imageContainer: {
        padding: 6,
        justifyContent: 'center',
        alignContent: 'center',
    },
    image: {
        marginLeft: 5,
        height: 50,
        width: 50
    },
    text: {
        flex: 1,
        fontSize: 18,
        textAlign: 'left',
        textAlignVertical: 'center'
    }
});

//make this component available to the app
export default UserMenuItem;
