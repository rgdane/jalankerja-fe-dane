import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LoginOutlined } from "@ant-design/icons";

type FormBuilderProps = {
  fields: any;
  onFinish: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  initialValues?: any;
  submitButtonText?: string;
};

const FormBuilder: React.FC<FormBuilderProps> = ({
  fields,
  onFinish,
  onFinishFailed,
  initialValues,
  submitButtonText = "Submit",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Form
      name="dynamic-form"
      labelCol={{ span: 8 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {fields.map((field: any) => {
        if (field.type === "input") {
          return (
            <Form.Item key={field.name} name={field.name} rules={field.rules}>
              <Input {...field.props} />
            </Form.Item>
          );
        }

        if (field.type === "password") {
          return (
            <Form.Item key={field.name} name={field.name} rules={field.rules}>
              <Input.Password {...field.props} />
            </Form.Item>
          );
        }

        if (field.type === "checkbox") {
          return (
            <Form.Item
              key={field.name}
              name={field.name}
              valuePropName={field.valuePropName}
            >
              <Checkbox>{field.label}</Checkbox>
            </Form.Item>
          );
        }

        return null;
      })}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<LoginOutlined />}
          className="w-full"
          size="large"
        >
          {submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormBuilder;
