import { Button as ButtonAntd, ButtonProps } from "antd";
import { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";

export default function Button(props: ButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ButtonAntd {...props} />;
}
