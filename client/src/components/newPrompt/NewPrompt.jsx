import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";

const NewPrompt = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });

  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.url && (
        <img src={img.dbData.url} alt="uploaded" width="380" />
      )}
      <div className="endChat" ref={endRef}></div>
      <form action="" className="newForm">
        <Upload setImg={setImg} />

        <input id="file" type="file" multiple={false} hidden />
        <input type="text" placeholder="Ask anything.." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
