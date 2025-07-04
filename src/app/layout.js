import ProviderLayout from "@/components/mainLayout/providerLayout";
import "@/components/style/main.css";
import "@/components/style/main.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import "./globals.css";

export const metadata = {
  title: "Castle Auction",
  description: "Castle Auction",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="favicon.ico" />
        <link rel="apple-icon" sizes="180x180" href="favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="Castle sphere" />
      </head>
      <body>
        <AntdRegistry>
          {/* <SocketProvider> */}
          <ProviderLayout>
            <Toaster position="top-center" />
            {children}
          </ProviderLayout>
          {/* </SocketProvider> */}
        </AntdRegistry>
      </body>
    </html>
  );
}
