import { useState } from "react";
import { useSelector } from "react-redux";
import { createStyles, Navbar, Group, Button } from "@mantine/core";
import { useElementSize, useMediaQuery } from "@mantine/hooks";
import {
  Dashboard,
  ZoomMoney,
  ChartBar,
  Settings,
  Cash,
  Logout,
} from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router";

import { setIsLoggedIn } from "../../Redux/userSlice";
import { UserInfo } from "../UserInfo/UserInfo";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor: theme.colors.indigo[6],
      borderColor: theme.colors.indigo[6],
    },

    version: {
      backgroundColor: theme.colors[theme.primaryColor][7],
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      "@media (max-width: 1300px)": {
        paddingBottom: theme.spacing.sm,
        marginBottom: theme.spacing.sm * 1.5,
      },
      borderBottom: `1px solid ${theme.colors.blue[9]}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      paddingBottom: theme.spacing.md,
      borderTop: `1px solid ${theme.colors.blue[9]}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.md,
      "@media (max-width: 1300px)": {
        fontSize: theme.fontSizes.sm,
      },
      color: theme.white,
      padding: `${theme.spacing.lg}px ${theme.spacing.xs}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.colors[theme.primaryColor][5],
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.colors.blue[9],
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },

    logoutLink: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.sm}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.colors[theme.primaryColor][5],
      },
    },
  };
});

const username = localStorage.getItem("username");
console.log(username);

const data = [
  { link: `/dashboard/${username}`, label: "Dashboard", icon: Dashboard },
  { link: `/expense/${username}`, label: "Expense", icon: ZoomMoney },
  { link: `/portfolio/${username}`, label: "Portfolio", icon: ChartBar },
  { link: `/budget/${username}`, label: "Budget", icon: Cash },
  { link: `/settings/${username}`, label: "Settings", icon: Settings },
];

const Sidebar = () => {
  //Mantine custom hooks for styling
  const { classes, cx } = useStyles();
  const { height } = useElementSize();
  const largeScreen = useMediaQuery("(min-width: 1300px)");

  //sets state for active link
  const [active, setActive] = useState("Dashboard");
  const dispatch = useDispatch();

  //Logout function
  const handleLogout = () => {
    dispatch(setIsLoggedIn());
    localStorage.removeItem("currentToken");
  };

  const navigate = useNavigate();

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        navigate(item.link);
        setActive(item.label);
        event.preventDefault();
        console.log(active);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  //Get user data from redux store
  const userData = useSelector((state: RootState) => state.user.user);
  const userImage = useSelector((state: RootState) => state.user.userImage);
  const { email, username } = userData;

  return (
    <Navbar
      height={largeScreen ? height : 700}
      width={{ sm: 300 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          Logo here
        </Group>
        <UserInfo avatar={userImage} name={username} email={email} />
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Button
          variant="subtle"
          size="md"
          className={classes.logoutLink}
          onClick={handleLogout}
        >
          <Logout className={classes.linkIcon} />
          <span>Logout</span>
        </Button>
      </Navbar.Section>
    </Navbar>
  );
};
export default Sidebar;
