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
        
          Table: {
            borderColor: "#BCD3D3",
            headerBg: "#EDF5F5",
            headerBorderRadius: 12,
            cellPaddingInline: 20,
            cellPaddingBlock: 10,
            footerBg: "#11643C",
            footerColor: "#011602",
            fontFamily: "Poppins",
          },
          Spin: {
            colorPrimary: "#ffffff",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
