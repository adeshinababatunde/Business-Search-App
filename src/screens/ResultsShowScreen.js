import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  console.log(result)

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result.name}</Text>
      <Text>Type: {result.categories[0].title}</Text>
      <Text></Text>
      <Image style={styles.image} source={{uri: result.photos[0]}} />

            <FlatList
      horizontal
      style={styles.otherImageContainer}
      showsHorizontalScrollIndicator={false}
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.otherImage} source={{ uri: item }} />;
        }}
      />
  
      <Text style={styles.price}>Price: {result.price}</Text>
      
      { !result.transactions ? <Text>Mode: {result.transactions.toString()}</Text> : null}
      <Text>Phone: {result.display_phone}</Text>
      <Text></Text>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10
  },

  image: {
    height: 200,
    width: '90%',
    margin: 10,
    borderRadius: 10,
    alignSelf: 'center'
  },
  otherImageContainer: {
    alignContent: 'center',
    alignSelf: 'center'
  },

  otherImage: {
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    color: 'purple',
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 10
  },
  price: {
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 20
  },
  desc: {

  }

});

export default ResultsShowScreen;
