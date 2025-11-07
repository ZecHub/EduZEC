import { motion } from "framer-motion";

interface DataContent {
  img: string;
  bkg: string;
  content: string;
}

interface IProf {
  id?: number;
  data: DataContent[];
}

const PageGeneral = ({ id, data }: IProf) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-row w-full h-auto">
        <div className="flex p-5 justify-center items-center w-1/2">
          <img src={data[0].img} alt="img" />
        </div>

        <div
          className={`flex  justify-center items-center p-5  font-bold w-1/2`}
        >
          <div
            className={`flex w-full h-full justify-center items-center bg-cover bg-center ${
              id === 4 ? "" : "px-14"
            }  bg-no-repeat `}
            style={{
              backgroundImage: `url(${data[0].bkg})`,
            }}
          >
            <div
              className={`w-full f text-justify text-xs  ${
                id === 4 ? "px-40" : "px-20"
              }`}
            >
              <motion.p
                className={` ${id === 3 ? " px-16" : ""} ${
                  id === 4 ? " " : "px-20"
                } font-bold text-lg`}
              >
                {data[0].content}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageGeneral;
