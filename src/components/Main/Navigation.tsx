import { educationalData } from "../../utils/constants";
import { Icon } from "../../ui/Icon";
import {
    FaArrowLeftLong as arrowLeft,
    FaArrowRight as arrowRight,
  } from "react-icons/fa6";
import { FaHome as home } from "react-icons/fa";

interface INav {
    actual: number;
    setActual: (e: number) => void;
    changePage: (e: number) => void;
  }


  const Navigation = ({ actual, setActual, changePage }: INav) => {
    return (
      <div className={`flex w-full justify-center bg-[${
            actual > 6 ? "#253a4d" : "#fff1c3"} p-5 `}>
        <div className={`flex flex-row w-2/6 space-x-10 justify-center ${actual > 6 ? 'text-white' : ''}`}>
          {actual != 1 && (
            <Icon
              name="back"
              icon={arrowLeft}
              className={`md:w-10  w-6 h-6 md:h-10 hover:cursor-pointer hover:scale-125 ${actual != 1 ? 'disabled' : ''}`}
              onClick={() => {
                changePage(-1);
              }}
            />
          )}
          <Icon
            icon={home}
            className="md:w-10 w-6 h-6 md:h-10 hover:cursor-pointer hover:scale-125 "
            onClick={() => {
              setActual(0);
            }}
          />
          {actual < educationalData.length - 1 && (
            <Icon
              name="forw"
              icon={arrowRight}
              className="md:w-10 w-6 h-6 md:h-10 hover:cursor-pointer hover:scale-125"
              onClick={() => {
                changePage(1);
              }}
            />
          )}
        </div>
      </div>
    );
  };

export default Navigation;