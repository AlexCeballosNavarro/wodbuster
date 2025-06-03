import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BenchmarksScreen = ({ navigation }) => {
  const [benchmarks, setBenchmarks] = useState([
    { name: 'Squat', value: '135lb' },
    { name: 'Bench Press', value: '225lb' },
    { name: 'Deadlift', value: '315lb' },
    { name: 'Overhead Press', value: '95lb' },
    { name: 'Clean & Jerk', value: '155lb' },
    { name: 'Snatch', value: '115lb' },
  ]);

  const handleBenchmarkChange = (text, index) => {
    const newBenchmarks = [...benchmarks];
    newBenchmarks[index].value = text;
    setBenchmarks(newBenchmarks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Benchmarks</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.benchmarksList}>
        {benchmarks.map((benchmark, index) => (
          <View key={index} style={styles.benchmarkItem}>
            <Text style={styles.benchmarkName}>{benchmark.name}</Text>
            <TextInput
              style={styles.benchmarkValue}
              value={benchmark.value}
              onChangeText={(text) => handleBenchmarkChange(text, index)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1c1c1c',
    paddingTop: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  benchmarksList: {
    padding: 15,
  },
  benchmarkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  benchmarkName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  benchmarkValue: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BenchmarksScreen; 