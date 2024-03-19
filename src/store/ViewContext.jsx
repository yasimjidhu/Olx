import { createContext, useState } from "react";

export const ViewContext = createContext(null);

function Post({ children }) {
  const [postDetails, setPostDetails] = useState();
  return (
    <ViewContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </ViewContext.Provider>
  );
}

export default Post;
