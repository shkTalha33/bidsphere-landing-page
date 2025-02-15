import ProviderLayout from "@/components/mainLayout/providerLayout";
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
  title: "Bid sphere",
  description: "Bid sphere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/auctionlogo.png" />
        <link rel="apple-icon" sizes="180x180" href="/assets/auctionlogo.png" />
        <meta name="apple-mobile-web-app-title" content="Bid sphere" />
      </head>
      <body>
        <AntdRegistry>
          <ProviderLayout>
            {/* <SocketProvider> */}
            {children}
            {/* </SocketProvider> */}
          </ProviderLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}