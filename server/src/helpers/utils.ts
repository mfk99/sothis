async function callApi(apiUrl: string, format = "json") {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  switch (format) {
    case "json":
      return response.json();
    case "xml":
      return response;
    default:
      console.error("Couldn't recognize datatype: ", format);
  }
}

export default callApi;
