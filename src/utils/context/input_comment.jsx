import { createContext, useState } from "react";

export const InputCommentContext = createContext();

export const InputCommentProvider = ({ children }) => {
  const [show, setIsShow] = useState(false);
  const [postId, setPostId] = useState();
  const toggleInput = (post) => {
    setIsShow(show === false ? true : false);
    setPostId(post);
  };

  return (
    <InputCommentContext.Provider value={{ toggleInput, show, postId }}>
      {children}
    </InputCommentContext.Provider>
  );
};
