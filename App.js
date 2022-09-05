import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

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
      <MapView
        style={styles.map}
        customMapStyle={require("./mapStyle.json")}
        showsUserLocation={false}
        region={region}
        onUserLocationChange={(event) => {
          setPinPoint({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Marker
          coordinate={pinPoint}
          draggable={true}
          image={require("./icons/pinPoint.png")}
        >
          <Callout>
            <Text>Yup, I'm here!!!</Text>
          </Callout>
        </Marker>
        <Circle
          center={pinPoint}
          radius={300}
          strokeWidth={2}
          strokeColor="rgba(255,255,255,1)"
          fillColor="rgba(255,255,255,0.5)"
        ></Circle>
      </MapView>
      <Button
        title="Where am I?"
        color="black"
        accessibilityLabel="Where am I?"
        onPress={() => {
          setRegion({
            latitude: pinPoint.latitude,
            longitude: pinPoint.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
      />
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
