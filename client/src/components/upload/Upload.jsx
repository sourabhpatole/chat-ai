import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
} from "@imagekit/react";

const Upload = ({ setImg }) => {
  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth");

      if (!response.ok) {
        throw new Error("Auth failed");
      }

      return response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const authParams = await authenticator();

      const { signature, expire, token, publicKey } = authParams;

      const response = await upload({
        file,
        fileName: file.name,
        signature,
        expire,
        token,
        publicKey,
      });

      console.log(response);

      setImg({
        isLoading: false,
        error: "",
        dbData: response,
      });
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.log(error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.log(error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.log(error.message);
      } else if (error instanceof ImageKitServerError) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <label htmlFor="file">
        <img src="/attachment.png" alt="upload" />
      </label>
      <input type="file" id="file" onChange={handleUpload} hidden />
    </>
  );
};

export default Upload;
