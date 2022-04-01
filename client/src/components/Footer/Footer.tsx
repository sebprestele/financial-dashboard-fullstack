import { createStyles, Container, Group, ActionIcon } from "@mantine/core";
import { BrandTwitter, BrandLinkedin, BrandGithub } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },
  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export default function Footer() {
  const { classes } = useStyles();
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        Logo here
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandLinkedin size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandGithub size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandTwitter size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
