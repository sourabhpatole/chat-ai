import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import axios from "axios";

const NewPrompt = () => {
  const endRef = useRef(null);

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [reply]);

  const sendMessage = async (e) => {
    e.preventDefault(); // VERY IMPORTANT

    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
        message,
      });

      setReply(res.data.reply);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div>Loading...</div>}

      {img.dbData?.url && (
        <img src={img.dbData.url} alt="uploaded" width="380" />
      )}

      <div className="endChat" ref={endRef}></div>

      <form className="newForm" onSubmit={sendMessage}>
        <Upload setImg={setImg} />

        <input id="file" type="file" multiple={false} hidden />

        <input
          type="text"
          placeholder="Ask anything.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">
          <img src="/arrow.png" alt="" />
        </button>

        <p>{reply}</p>
      </form>
    </>
  );
};

export default NewPrompt;
