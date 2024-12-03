import React, { FC, useEffect } from "react";
import { QuestionTextareaPropsType } from "./interface";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
const { TextArea } = Input;
const PropComponent: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType
) => {
  const { title, placeholder, onChange, disabled } = props;
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
      disabled={disabled}
    >
      <Form.Item
        label="请输入标题"
        name="title"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <TextArea />
      </Form.Item>
    </Form>
  );
};
export default PropComponent;
