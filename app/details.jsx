import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { ProductContext } from './context/ProductContext';
import { AntDesign } from '@expo/vector-icons';

const Index = () => {
  const { products, loading, error } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: `https://api.timbu.cloud/images/${item.photos[0].url}` }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.current_price[0].NGN[0] ? `₦${item.current_price[0].NGN[0]}` : 'Price not available'}</Text>
      </View>
      <TouchableOpacity onPress={() => setSelectedProduct(item)}>
        <AntDesign name="hearto" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      {selectedProduct && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={true}
          onRequestClose={() => setSelectedProduct(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => setSelectedProduct(null)} style={styles.closeButton}>
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Image source={{ uri: `https://api.timbu.cloud/images/${selectedProduct.photos[0].url}` }} style={styles.modalImage} />
              <Text style={styles.modalName}>{selectedProduct.name}</Text>
              <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
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
    backgroundColor: '#ffffff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150
  },
  info: {
    padding: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    fontFamily: 'Poppins-Regular'
  },
  price: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Poppins-Regular'
  },
  list: {
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  modalDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  }
});

export default Index;
