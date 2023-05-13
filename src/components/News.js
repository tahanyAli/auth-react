import axios from "axios";
import React, { useEffect, useState } from "react";
import cookies from "react-cookies";
function News() {
  const [news, setNews] = useState([]);
  const [role, setRole] = useState("");
  const fetchData = async () => {
    try {
      const newsData = await axios.get("http://localhost:3002/news");
      setNews(newsData.data);
      console.log(newsData.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setRole(cookies.load("role"));
    fetchData();
  }, [news]);
  const deleteNews = async (id) => {
    const token = cookies.load("token");
    await axios
      .delete(`http://localhost:3002/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        fetchData();
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      {news &&
        news.map((item, index) => (
          <li>
            <p key={index}>
              {item.title} by {item.user.userName}
            </p>
            {role === "admin" && (
              <>
                <button onClick={() => deleteNews(item.id)}>delete</button>
                <button>edit</button>
              </>
            )}
          </li>
        ))}
    </div>
  );
}

export default News;
