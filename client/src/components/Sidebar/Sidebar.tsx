import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { createStyles, Navbar, Group, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  Dashboard,
  ZoomMoney,
  ChartBar,
  Settings,
  Cash,
  Logout,
} from "tabler-icons-react";

import { RootState } from "../../Redux/store";
import { setIsLoggedIn } from "../../Redux/userSlice";
import { setActiveItem } from "../../Redux/helperSlice";
import { UserInfo } from "../UserInfo/UserInfo";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor: theme.colors.indigo[6],
      borderColor: theme.colors.indigo[6],
      //sticky nav
      position: "fixed",
      minHeight: "100%",
      top: 0,
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
      /*   borderBottom: `1px solid ${theme.colors.blue[9]}`, */
    },

    footer: {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      paddingBottom: theme.spacing.sm,
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
      padding: `${theme.spacing.md}px ${theme.spacing.xs}px`,
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

const data = [
  { link: `/dashboard/${username}`, label: "Dashboard", icon: Dashboard },
  { link: `/expense/${username}`, label: "Expense", icon: ZoomMoney },
  { link: `/portfolio/${username}`, label: "Portfolio", icon: ChartBar },
  { link: `/budget/${username}`, label: "Budget", icon: Cash },
  { link: `/settings/${username}`, label: "Settings", icon: Settings },
];

const Sidebar = () => {
  const dispatch = useDispatch();

  //Mantine custom hooks for styling
  const { classes, cx } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 1300px)");

  //sets state for active link
  const active = useSelector((state: RootState) => state.helper.activeItem);
  console.log(active, "Active outside click");
  //Logout function
  const handleLogout = () => {
    dispatch(setIsLoggedIn());
    localStorage.removeItem("currentToken");
  };

  const navigate = useNavigate();

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        navigate(item.link);
        dispatch(setActiveItem(item.label));
        event.preventDefault();
        console.log(active);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </Link>
  ));

  //Get user data from redux store
  const userData = useSelector((state: RootState) => state.user.user);
  const userImage = useSelector((state: RootState) => state.user.userImage);
  const { email, username } = userData;

  return (
    <Navbar
      width={{ sm: largeScreen ? 300 : 200 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section mt={-45}>
        <Group className={classes.header} position="apart"></Group>

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
