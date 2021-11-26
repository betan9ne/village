<Section>
<SectionContent>
  <Text fontWeight="bold" style={{ textAlign: "center" }}>
    These UI components provided by Rapi UI
  </Text>
  <Button
    style={{ marginTop: 10 }}
    text="Rapi UI Documentation"
    status="info"
    onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
  />
  <Button
    text="Go to second screen"
    onPress={() => {
      navigation.navigate("SecondScreen");
    }}
    style={{
      marginTop: 10,
    }}
  />
  <Button
    status="danger"
    text="Logout"
    onPress={() => {
      firebase.auth().signOut();
    }}
    style={{
      marginTop: 10,
    }}
  />
  <Button
    text={isDarkmode ? "Light Mode" : "Dark Mode"}
    status={isDarkmode ? "success" : "warning"}
    onPress={() => {
      if (isDarkmode) {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }}
    style={{
      marginTop: 10,
    }}
  />
</SectionContent>
</Section>