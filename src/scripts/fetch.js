import axios from "axios";

const fetchData = async (url) => {
  try {
    let response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 1000,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { fetchData };
