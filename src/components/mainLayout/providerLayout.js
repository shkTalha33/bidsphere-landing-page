"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import MainLayout from "./mainLayout";
import { I18nextProvider } from "react-i18next";

import { usePathname } from "next/navigation";
import SidebarLayout from "./sidebarLayout";
import { SocketProvider } from "../socketProvider/socketProvider";
import i18n from "../language-change/i18n";

const ProviderLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <SocketProvider>
            {pathname.startsWith("/vender") ? (
              <SidebarLayout>{children}</SidebarLayout>
            ) : (
              <MainLayout>{children}</MainLayout>
            )}
          </SocketProvider>
        </I18nextProvider>
      </Provider>
    </>
  );
};

export default ProviderLayout;
