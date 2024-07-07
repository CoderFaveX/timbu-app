import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { ProductContext } from './context/ProductContext';
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const Index = () => {
  const { products, loading, error } = useContext(ProductContext);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: `https://api.timbu.cloud/images/${item.photos[0].url}` }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.highlight}>{item.is_available ? 'Available' : 'Out Of Stock'}</Text>
        <Text style={styles.price}>{item.current_price[0].NGN[0] ? `₦${item.current_price[0].NGN[0]}` : 'Price not available'}</Text>
        <TouchableOpacity style={styles.infoButton} onPress={() => setSelectedProductIndex(index)}>
          <Text style={styles.infoButtonText}>INFO  &nbsp; <AntDesign name="infocirlceo" style={{ fontSize: 15 }} /></Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleNextProduct = () => {
    setSelectedProductIndex((prevIndex) => (prevIndex + 1) % products.length);
    setShowFullDescription(false);
  };

  const handlePrevProduct = () => {
    setSelectedProductIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    setShowFullDescription(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error loading products: {error.message}</Text>
      </View>
    );
  }

  const selectedProduct = selectedProductIndex !== null ? products[selectedProductIndex] : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Products</Text>
        <AntDesign name="user" style={{ fontSize: 23, color: '#f2f2f2' }} />
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={styles.list}
      />
      {selectedProduct && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={true}
          onRequestClose={() => setSelectedProductIndex(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setSelectedProductIndex(null)} style={styles.closeButton}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePrevProduct} style={styles.arrowButtonLeft}>
                <AntDesign name="left" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.modalImgHold}>
                <Image source={{ uri: `https://api.timbu.cloud/images/${selectedProduct.photos[0].url}` }} style={styles.modalImage} />
              </View>
              <Text style={styles.modalName}>{selectedProduct.name}</Text>
              <Text style={styles.modalDescription}>
                {showFullDescription ? selectedProduct.description : `${selectedProduct.description.substring(0, 156)}...`}
              </Text>
              <TouchableOpacity onPress={() => setShowFullDescription((prev) => !prev)} style={styles.seeMoreButton}>
                <Text style={styles.seeMoreButtonText}>{showFullDescription ? 'See Less' : 'See More'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextProduct} style={styles.arrowButtonRight}>
                <AntDesign name="right" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    fontFamily: 'Poppins',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'Poppins',
  },
  headerImg: {
    width: 30,
    height: 30,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  item: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 25,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#777',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    alignItems: 'center',
    borderColor: '#BBB',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  imgContainer: {
    position: 'relative',
    transform: [{ scale: 1 }],
  },
  info: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    color: '#333333',
    fontFamily: 'Poppins',
  },
  price: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Poppins',
  },
  highlight: {
    fontSize: 15,
    color: '#9494ec',
    fontFamily: 'Poppins',
  },
  list: {
    paddingVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    paddingLeft: 35,
    paddingRight: 35,
    alignItems: 'flex-start',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  modalName: {
    fontSize: 17,
    color: '#333333',
    marginBottom: 10,
    fontFamily: 'Poppins',
  },
  modalDescription: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'left',
    lineHeight: 24,
    fontFamily: 'Poppins',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  infoButton: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#2196F3',
    borderRadius: 50,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'PoppinsBold',
  },
  seeMoreButton: {
    marginTop: 10,
    backgroundColor: '#87CEFA',
    fontFamily: 'Poppins',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  seeMoreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  arrowButtonLeft: {
    position: 'absolute',
    borderColor: "#EEE",
    color: "#fff",
    backgroundColor: "#555",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    left: 10,
    top: '50%',
    transform: [{ translateY: -50 }, { translateX: -25 }],
    zIndex: 4
  },
  arrowButtonRight: {
    position: 'absolute',
    borderColor: "#EEE",
    borderRadius: 50,
    color: "#fff",
    backgroundColor: "#555",
    borderStyle: "solid",
    borderWidth: 2,
    padding: 10,
    right: 10,
    top: '50%',
    transform: [{ translateY: -50 }, { translateX: 25 }],
  },
});

export default Index;
