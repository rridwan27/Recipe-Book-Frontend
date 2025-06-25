import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Typewriter = () => {
  const [text] = useTypewriter({
    words: [
      "Delicious Recipes",
      "Quick Meals",
      "Healthy Choices",
      "Loved by Everyone!",
    ],
    loop: Infinity,
    onLoopDone: () => console.log("Typewriter loop completed."),
  });

  return (
    <div className="text-center mt-5">
      <h1 className="text-4xl font-bold text-violet-600 mb-4">
        <span>{text}</span>
        <Cursor cursorColor="violet" />
      </h1>
    </div>
  );
};

export default Typewriter;
