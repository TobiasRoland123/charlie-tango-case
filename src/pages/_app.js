import "@/styles/globals.css";
import { Header } from "@/components/Header/Header";
import { createContext, useState } from "react";

export const SellerInformation = createContext();

export default function App({ Component, pageProps }) {
  const [sellerDetails, setSellerDetails] = useState({});
  return (
    <>
      <Header />
      <SellerInformation.Provider value={[sellerDetails, setSellerDetails]}>
        <main>
          <Component {...pageProps} />
        </main>
      </SellerInformation.Provider>
    </>
  );
}
