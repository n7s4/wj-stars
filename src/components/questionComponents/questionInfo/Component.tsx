import React, { FC } from "react";
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from "./interface";
import { Typography } from "antd";
const { Paragraph, Title } = Typography;
const QuestionInfo: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType
) => {
  const {
    title,
    desc,
    isCenter = false,
  } = {
    ...QuestionInfoDefaultProps,
    ...props,
  };
  const descTextList = desc?.split("\n");
  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ fontSize: "24px" }}>{title}</Title>
      <Paragraph>
        {descTextList?.map((t, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {t}
            </span>
          );
        })}
      </Paragraph>
    </div>
  );
};
export default QuestionInfo;
