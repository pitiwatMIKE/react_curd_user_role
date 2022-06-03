import React, { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";

export default function AboutPage() {
  const fileName = "about.md";
  const [post, setPost] = useState("");

  useEffect(() => {
    import(`../markdown/${fileName}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setPost(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });
  return (
    <>
      <Markdown>{post}</Markdown>
    </>
  );
}
