import {
  Group,
  Text,
  useMantineTheme,
  MantineTheme,
  Loader,
} from "@mantine/core";
import { Dropzone, DropzoneStatus, MIME_TYPES } from "@mantine/dropzone";
import { Upload, Photo, X, Icon as TablerIcon } from "tabler-icons-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { setDropzoneOpenState } from "../../Redux/helperSlice";
import { setSingleUser } from "../../Redux/userSlice";

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }
  if (status.rejected) {
    return <X {...props} />;
  }
  return <Photo {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) =>
  !status.accepted ? (
    <Group
      position="center"
      spacing="xl"
      style={{ minHeight: 220, pointerEvents: "none" }}
    >
      <ImageUploadIcon
        status={status}
        style={{ color: getIconColor(status, theme) }}
        size={80}
      />
      <div>
        <Text size="xl" inline>
          Drag images here or click to select file
        </Text>
        <Text size="sm" color="dimmed" inline mt={7}>
          File should not exceed 5mb. Only JPG and PNG images!
        </Text>
      </div>
    </Group>
  ) : (
    <Group
      position="center"
      spacing="xl"
      style={{ minHeight: 220, pointerEvents: "none" }}
    >
      <div>
        <Text size="xl" inline>
          Successful upload! Return to profile
        </Text>
      </div>
    </Group>
  );

export default function ImageUpload() {
  const theme = useMantineTheme();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("currentToken");
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  const uploadImage = async (base64EncodedImage: String) => {
    try {
      setIsLoading(true);
      await fetch(
        `https://finans-fullstack-app-server.herokuapp.com/api/v1/upload`,
        {
          method: "POST",
          body: JSON.stringify({ data: base64EncodedImage, userId: userId }),
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    await fetch(
      `https://finans-fullstack-app-server.herokuapp.com/api/v1/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(setSingleUser(data));
        setIsLoading(false);
        dispatch(setDropzoneOpenState());
      });
  };

  return !isLoading ? (
    <Dropzone
      onDrop={(files) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        //@ts-ignore
        reader.onloadend = () => uploadImage(reader.result);
      }}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  ) : (
    <Loader />
  );
}
