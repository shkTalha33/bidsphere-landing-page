"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import MainLayout from "./mainLayout";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { usePathname } from "next/navigation";
import SidebarLayout from "./sidebarLayout";

const ProviderLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          {pathname.startsWith("/vender") ? (
            <SidebarLayout>{children}</SidebarLayout>
          ) : (
            <MainLayout>{children}</MainLayout>
          )}
        </I18nextProvider>
      </Provider>
    </>
  );
};

export default ProviderLayout;
