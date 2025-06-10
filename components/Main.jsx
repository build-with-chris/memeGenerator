import { useState, useEffect } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "Shut up.",
    bottomText: "And take my money",
    imageUrl: "https://i.imgflip.com/19ihkm.jpg"
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
      .catch(console.error);
  }, []);

  function getMemeImage() {
    if (!allMemes.length) return;
    const idx = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[idx].url;
    setMeme(prev => ({ ...prev, imageUrl: url }));
  }

  function handleChange(event) {
    const { name, value } = event.currentTarget;
    setMeme(prev => ({ ...prev, [name]: value }));
  }

  return (
    <main>
      <div className="form">
        <label>Top Text
          <input
            type="text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
        </label>
        <label>Bottom Text
          <input
            type="text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </label>
        <button onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} alt="Your Meme" />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}