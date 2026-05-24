import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import axios from "axios";
import Markdown from "react-markdown";
const NewPrompt = () => {
  const endRef = useRef(null);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [message, reply, img.dbData]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;

    if (!text) return;

    // store current image
    const currentImage = img.dbData?.url;

    // add user message immediately
    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text,
        image: currentImage || null,
      },
    ]);

    setMessage("");

    // clear upload state
    setImg({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3000/api/chat", {
        message: text,
        imageUrl: currentImage,
      });

      // add AI reply
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.reply,
        },
      ]);
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
      {chat.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.role === "user" ? "user" : ""}`}
        >
          {msg.image && <img src={msg.image} alt="" width="300" />}

          <Markdown>{msg.text}</Markdown>
        </div>
      ))}
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
