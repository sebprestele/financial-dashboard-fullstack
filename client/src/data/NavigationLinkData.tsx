import { useSelector } from "react-redux";
import {
  Dashboard,
  ZoomMoney,
  ChartBar,
  Settings,
  Cash,
} from "tabler-icons-react";

import { RootState } from "../Redux/store";

export function NavigationLinkData() {
  const username = useSelector((state: RootState) => state.user.user.username);

  const navLinkData = [
    { link: `/dashboard/${username}`, label: "Dashboard", icon: Dashboard },
    { link: `/expense/${username}`, label: "Expense", icon: ZoomMoney },
    { link: `/portfolio/${username}`, label: "Portfolio", icon: ChartBar },
    { link: `/budget/${username}`, label: "Budget", icon: Cash },
    { link: `/settings/${username}`, label: "Settings", icon: Settings },
  ];

  return {
    navLinkData,
  };
}
