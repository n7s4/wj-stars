import React, { FC } from "react";
import { Input, Typography } from "antd";
import { QuestionInputPropsType, questionInputDefaultProps } from "./interface";

const { Paragraph } = Typography;
const questionInput: FC<QuestionInputPropsType> = (
  props: QuestionInputPropsType
) => {
  const { title = "", placeholder = "" } = {
    ...questionInputDefaultProps,
    ...props,
  };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  );
};
export default questionInput;
