// features/navigation/items/prd.ts
import { AppstoreOutlined, ReadOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const _PREFIX = "/dashboard/prd";

export const prdGroup: MenuItem = {
  key: "prdGroup",
  label: "PRD",
  type: "group",
  children: [
    {
      key: "/dashboard/prd",
      label: "SOP PRD",
      icon: <ReadOutlined />,
      children: [
        { key: `${_PREFIX}/overview-product`, label: "Overview Product" },
        { key: `${_PREFIX}/brand-guidelines`, label: "Brand Guideliness" },
        { key: `${_PREFIX}/bisnis-proyek`, label: "Bisnis Proyek" },
        { key: `${_PREFIX}/epic-dan-fitur`, label: "Epic dan Fitur" },
        { key: `${_PREFIX}/sitemap-menu`, label: "Sitemap Menu" },
        { key: `${_PREFIX}/user-stories`, label: "User Stories" },
        { key: `${_PREFIX}/user-flow-diagram`, label: "User Flow Diagram" },
        { key: `${_PREFIX}/draft-prd`, label: "Draft PRD" },
      ],
    },
    {
      key: `${_PREFIX}/sop/brand-guideliness`,
      label: "SOP Brand Guideliness",
      icon: <ReadOutlined />,
    },
  ],
};
