import { Table } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";

export const TableBuilder = <T extends object>(props: TableProps<T>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Table {...props} />;
};
