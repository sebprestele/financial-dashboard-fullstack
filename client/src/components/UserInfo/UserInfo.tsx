import { Avatar, Text, Paper } from "@mantine/core";
import EditProfileButton from "./EditProfileButton";

interface UserInfoActionProps {
  avatar: string;
  name: string;
  email: string;
}

export function UserInfo({ avatar, name, email }: UserInfoActionProps) {
  return (
    <Paper
      radius="md"
      p="sm"
      mb="xl"
      sx={(theme) => ({
        backgroundColor: theme.colors.indigo[6],
      })}
    >
      <Avatar src={avatar} size={60} radius={60} mx="auto" />
      <Text
        align="center"
        color="white"
        size="sm"
        transform="uppercase"
        weight={500}
        mt="md"
      >
        {name}
      </Text>
      <Text align="center" color="white" size="sm" mb="sm">
        {email}
      </Text>
      <EditProfileButton />
    </Paper>
  );
}
