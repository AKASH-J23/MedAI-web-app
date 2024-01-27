import React from "react";
import { useNavigate } from "react-router-dom";

function Servicecard(props) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(props.route);
  };

  return (
    <div className="mx-3 my-5 max-w-sm rounded overflow-hidden shadow-lg">
      <img src={props.src} alt={props.alt} width={400} height={400} />
      <div className="bg-gray-100 px-6 py-4">
        <div className="bg-gray-100 font-bold text-center text-xl mb-2">
          {props.title}
        </div>
        <p className="text-black text-center bg-gray-100 text-base">
          {props.content}
        </p>
      </div>
      <div className="px-32 py-2 bg-gray-700">
        <span>
          <button
            onClick={handleOnClick}
            className="bg-green-800 hover:bg-green-700 text-white rounded py-2 px-4 flex"
          >
            {props.button}
          </button>
        </span>
      </div>
    </div>
  );
}

export default Servicecard;
