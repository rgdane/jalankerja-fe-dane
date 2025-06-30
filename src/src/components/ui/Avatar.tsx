import { Avatar as AvatarAntd, AvatarProps } from "antd";
import { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";

export default function Avatar(props: AvatarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <AvatarAntd {...props} />;
}
