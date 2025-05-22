import { type JSX, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { HttpRequest, send } from "schwi";

export default function Index(): JSX.Element {
  const [data, setData] = useState("");

  useEffect(() => {
    void (async function () {
      const request = new HttpRequest.Builder("https://api.github.com")
        .build();

      const response = await send(request);
      const data = await response.toJSON();

      setData(JSON.stringify(data, null, 2));
    }());
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
      }}
    >
      <Text>{data}</Text>
    </View>
  );
}
