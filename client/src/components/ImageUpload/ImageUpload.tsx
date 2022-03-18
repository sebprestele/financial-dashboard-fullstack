import { Group, Text, useMantineTheme, MantineTheme } from "@mantine/core";
import { Upload, Photo, X, Icon as TablerIcon } from "tabler-icons-react";
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import axios from "axios";

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

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
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
        File should not exceed 5mb
      </Text>
    </div>
  </Group>
);

//const CLOUDINARY_API = 971917323984319;

export default function ImageUpload() {
  const theme = useMantineTheme();
  return (
    <Dropzone
      onDrop={(files) => {
        // const instance = axios.create();
        /*   const imageData = new FormData();
        imageData.append("file", files[0]);
        imageData.append("upload_preset", "brashed"); */

        /*     fetch("https://api.cloudinary.com/dmpebjzbf/image/upload", {
          method: "post",
          body: imageData,
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err)); */

        /*   axios
          .post(
            "https://api.cloudinary.com/dmpebjzbf/image/upload",
            imageData,
            {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }
          )  .then((res) => console.log(res))
          .catch((error) => console.log(error));
          */

        /* instance
          .post("https://api.cloudinary.com/dmpebjzbf/image/upload", imageData)
          .then((res) => console.log(res))
          .catch((error) => console.log(error)); */

        console.log("accepted files", files);
      }}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
}
