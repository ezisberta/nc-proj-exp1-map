import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import Map from "./Components/Map";

export default function App() {
  const [pinPoint, setPinPoint] = useState({
    latitude: 53.8087146,
    longitude: -1.6229181,
  });

  const [region, setRegion] = useState({
    latitude: pinPoint.latitude,
    longitude: pinPoint.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPinPoint({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}> {`Me on a map! <3`} </Text>
      <Map />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 30 },
  map: {
    width: 270,
    height: 270,
    borderStyle: "solid",
    borderWidth: 5,
    borderTopLeftRadius: 20,
  },
});
