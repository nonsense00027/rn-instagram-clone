import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Container from "../../components/Container";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import {
  useStyleContext,
  useAuthContext,
  useProfilesContext,
} from "../../contexts";
import Explores from "../../components/Explore/Explores";

const Explore = () => {
  const { theme } = useStyleContext();
  const { user } = useAuthContext();
  const { profiles } = useProfilesContext();
  const [search, setSearch] = useState("");

  const getProfiles = () => {
    return profiles.filter(
      (item) =>
        (item.username.includes(search) ||
          item.email.split("@")[0].includes(search)) &&
        item.id !== user.id
    );
  };

  return (
    <Container>
      <View style={tw`px-5 pt-4 flex-1`}>
        <View
          style={[
            tw`flex-row px-4 py-3 rounded-md`,
            { backgroundColor: theme.post },
          ]}
        >
          <TextInput
            style={[tw`flex-grow`, { color: theme.text }]}
            value={search}
            placeholderTextColor={theme.placeholder}
            placeholder="Search"
            onChangeText={(text) => setSearch(text)}
            autoFocus
          />
          {search.length > 0 ? (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Icon
                type="font-awesome"
                name="close"
                color={theme.placeholder}
                size={20}
              />
            </TouchableOpacity>
          ) : (
            <Icon
              type="font-awesome"
              name="search"
              color={theme.placeholder}
              size={20}
            />
          )}
        </View>

        {search.length > 0 ? (
          getProfiles().length > 0 ? (
            <View style={tw`flex-1 pt-4`}>
              <Explores data={getProfiles()} />
            </View>
          ) : (
            <View style={tw`flex-1 justify-center items-center opacity-60`}>
              <Icon
                type="ant-design"
                name="deleteuser"
                color={theme.icon}
                size={50}
              />
              <Text style={[tw`pt-2`, { color: theme.text }]}>
                Found nothing..
              </Text>
            </View>
          )
        ) : (
          <View style={tw`flex-1 justify-center items-center opacity-70`}>
            <Icon
              type="ant-design"
              name="instagram"
              color={theme.icon}
              size={50}
            />
            <Text style={[tw`pt-2`, { color: theme.text }]}>
              Explore other people..
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
};

export default Explore;
