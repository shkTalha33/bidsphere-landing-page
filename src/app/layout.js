import ProviderLayout from "@/components/mainLayout/providerLayout";
import { SocketProvider } from "@/components/socketProvider/socketProvider";
import '@/components/style/main.css';
import '@/components/style/main.scss';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import "./globals.css";

export const metadata = {
  manifest: "/manifest.json",
  title: "Set of Shops",
  description: "Set of Shops Buy & Sell",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-icon" sizes="180x180" href="/apple-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Set of Shops" />
      </head>
      <body>
        <AntdRegistry>
          <ProviderLayout>
            <SocketProvider>
              {children}
            </SocketProvider>
          </ProviderLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
