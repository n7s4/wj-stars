import React, { FC, useEffect } from "react";
import { QuestionInputPropsType } from "./interface";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
const PropComponent: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType
) => {
  const { title, placeholder, onChange } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);
  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      onValuesChange={handleValueChange}
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
    >
      <Form.Item
        label="请输入标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
