export const mergeError = (errorsObj, setError) => {
    
    // Object.entries(errorsObj) 
    // { email: ["Please provide correct email"] } 
    // to
    // [["email", ["Please provide correct email"]]]
    Object.entries(errorsObj) 
    .forEach(([field, messages]) => {
      if (messages?.length) {
        setError(field, {
          type: "server",
          message: messages[0],
        });
      }
    });
  };
