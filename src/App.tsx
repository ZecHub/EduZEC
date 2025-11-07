import { useState, useEffect } from "react";
import Home from "@/components/Main/Home";
import { educationalData } from "./utils/constants";
import Loading from "@/components/Loading/Loading";
import Navigation from "@/components/Main/Navigation";
import PageGeneral from "@/components/PageGeneral/PageGeneral";
import { Device } from "@/components/Main/Device";
import Ecosystem from "@/components/Shielded&Ecosystem/Shielded&Ecosystem";
import CreateAWallet from "@/components/CreateAWallet/CreateAWallet";
import AppWallet from "@/components/AppWallet/AppWallet";
import ExploreMore from "@/components/ExploreMore/ExploreMore";
import WalletAddress from "@/components/AppWallet/WalletAddress";
import { useWebZjsActions } from "./hooks/useWebzActions";
import { useInterval } from 'usehooks-ts';
import { RESCAN_INTERVAL } from "./utils/constants";

const App = () => {
  const [actual, setActual] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [winWidth, setWinWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const { id, title, data } = educationalData[actual];
  const { triggerRescan } = useWebZjsActions();

  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [winWidth]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [actual]);

  useInterval(() => {
    triggerRescan();
  }, RESCAN_INTERVAL);

  const changePage = (dir: number) => {
    setIsLoading(true);
    setActual((prev) => {
      const newAct = prev + dir;
      return Math.max(0, Math.min(newAct, educationalData.length - 1));
    });
  };

  return (
    <div className={`flex flex-col items-center w-screen h-screenl`} style={{
      backgroundColor: `${actual < 7 ? "#fff1c3" : "#1B405B"}`,
    }}>
      {winWidth < 830 && <Device />}
      {isLoading && <Loading actual={actual}/>}

      {actual === 0 ? (
        <Home
          change={changePage}
          classnames={`${winWidth < 830 && actual === 0 ? "hidden" : ""}`}
        />
      ) : (
        <div
          className={`flex flex-col w-full h-full ${isLoading ? "hidden" : ""}`}

        >
          <div
            className={`flex w-full flex-grow-0 px-10 py-6 text-center text-2xl order-1 font-bold`}
          >
            <h1 className={`border-double border-b-4 ${actual > 6 ? "text-white border-white" : "border-black"}`}>
              {id}. {title}
            </h1>
          </div>

          <div className={`flex container justify-center h-auto flex-grow order-2 border-dotted rounded-lg ${actual > 6 ? "border-r-4 border-b-4 border-yellow-500" : "ml-10 border-l-4 border-t-4 border-sky-700"}`}>
            {actual > 0 && actual < 5 && <PageGeneral id={id} data={data} />}
            {(actual === 5 || actual === 6) && <Ecosystem id={actual} />}
            {actual === 7 && <CreateAWallet />}
            {actual === 8 && <WalletAddress />}
            {actual === 9 && <AppWallet />}
            {actual === 10 && <ExploreMore />}
          </div>

          <div className="flex-grow-0 order-3 z-40">
            <Navigation
              actual={actual}
              setActual={setActual}
              changePage={changePage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
