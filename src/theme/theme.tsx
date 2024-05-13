import { ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";

export const Theme: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            buttonSolidCheckedActiveBg: "#000000",
            buttonSolidCheckedBg: "#000000",
            colorPrimary: "#000000",
            fontSizeLG: 16,
            colorBorder: "#000000",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
