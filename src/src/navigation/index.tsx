import type { MenuProps } from "antd";
import { generalGroup } from "./items/general";
import { prdGroup } from "./items/prd";

export const navigationItems: MenuProps["items"] = [generalGroup, prdGroup];
