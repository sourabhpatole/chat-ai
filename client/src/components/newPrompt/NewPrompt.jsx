import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import axios from "axios";
import Markdown from "react-markdown";
const NewPrompt = () => {
  const endRef = useRef(null);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [message, reply, img.dbData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3000/api/chat", {
        message: message,
        imageUrl: img.dbData?.url,
      });
      setReply(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.url && (
        <img src={img.dbData.url} alt="uploaded" width="380" />
      )}
      {message && <div className="message user">{message}</div>}
      {reply && (
        <div className="message">
          <Markdown>{reply}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form action="" className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />

        <input id="file" type="file" multiple={false} hidden />
        <input
          type="text"
          name="text"
          placeholder="Ask anything.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
