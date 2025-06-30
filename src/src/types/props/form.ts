export type FormProps = {
  name: string;
  type: "input" | "password" | "checkbox";
  rules?: any[];
  props?: any;
  valuePropName?: string;
  label?: string;
};
