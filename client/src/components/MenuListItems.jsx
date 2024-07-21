import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const icons = [
  {
    icon: <SpaceDashboardIcon />,
    title: "Dashboard",
    url: "/stock/",
  },
  {
    title: "Empty Fatura",
    icon: <StoreIcon />,
    url: "/stock/involves/",
  },
  {
    title: "List Invoices",
    icon: <InventoryIcon />,
    url: "/stock/listInvoives/",
  },
  {
    title: "Clients",
    icon: <ShoppingCartIcon />,
    url: "/stock/customer/",
  },
];

const MenuListItems = () => {
  const navigate = useNavigate();
  return (
    <List style={{ zIndex: 0 }}>
      {icons.map((item, index) => (
        <ListItem
          sx={{
            color: "black",
            "&:hover": { color: "#73BA9B" },
            "&:hover .MuiSvgIcon-root": { color: "#73BA9B" },
            "& .MuiSvgIcon-root": { color: "black" },
          }}
          key={index}
          disablePadding
          onClick={() => navigate(item.url)}
        >
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuListItems;
