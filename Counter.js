import { Pressable, StyleSheet, Text, View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import React from 'react';

const Counter = ({ count }) => {
    const dispatch = useDispatch();;
    return (
        <View style={styles.container}>
            <Text>{count}</Text>
            <Pressable style={{ width: 60, height: 40, borderWidth: 1, borderColor: 'black', alignItems: 'center', justifyContent: 'center' }}
                onPress={() => {
                    // store.dispatch(increment);
                    // setCount(store.getState().count);
                    dispatch({ type: 'increment' });
                    console.log("count");
                }}
            >
            </Pressable>
        </View>

    );
};

var mapStateToProps = (state) => ({
    count: state.count
})

export default connect(mapStateToProps, null)(Counter);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

