import React, { useState, useEffect } from "react";

const mainTopics = [
  "maths",
  "english",
  "history",
  "geography",
  "management",
  "economics",
];

export default function TopicSelection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [topics, setTopics] = useState(mainTopics);

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      console.log("Called");
      if (searchTerm === "") {
        setTopics(mainTopics);
      } else {
        let tempTopics = mainTopics.filter((item) => {
          if (item.includes(searchTerm)) {
            return item;
          }
        });
        console.log(tempTopics);
        setTopics(tempTopics);
      }
    }, 1000);
    return () => clearTimeout(delayBounce);
  }, [searchTerm]);

  const showTopics = () => {
    return topics.map((item) => {
      return <p>{item}</p>;
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          {showTopics()}
        </div>
      </div>
    </div>
  );
}
