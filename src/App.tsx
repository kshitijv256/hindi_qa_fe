import "./index.css";
import sendIcon from "./assets/send.png";
import React from "react";

function App() {
  const [context, setContext] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  const onSubmithandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      id: "1",
      context: context,
      question: question,
      language: "hindi",
    };
    console.log(data);
    const resp = await fetch("http://127.0.0.1:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    });
    console.log(resp);
    const json = await resp.json();
    setAnswer(json.answer);
  };

  return (
    <>
      <div className="bg-slate-800 w-screen h-screen flex flex-col items-center pt-8">
        <h1 className="text-sky-400 py-4 text-6xl font-bold">
          हिंदी प्रश्न उत्तर
        </h1>
        <form className="flex flex-col" action="/submit">
          <h1 className="text-3xl p-2 text-white font-bold">संदर्भ</h1>
          <textarea
            className="rounded-md text-2xl bg-slate-700 text-white p-4 mb-4 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:border-transparent"
            placeholder="कृपया संदर्भ भरें"
            name="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            id=""
            cols={60}
            rows={8}
          ></textarea>
          <h1 className="p-2 text-3xl text-white font-bold">प्रश्न</h1>
          <div className="flex">
            <input
              className="rounded-md text-2xl bg-slate-700 text-white p-4 w-[54rem] focus:outline-none focus:ring-4 focus:ring-blue-600 focus:border-transparent"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="कृपया प्रश्न भरें"
              type="text"
            />

            <button
              className="rounded-md bg-sky-400 p-3 ml-4"
              type="submit"
              onClick={onSubmithandler}
            >
              <img className="h-8 w-8" src={sendIcon} alt="" />
            </button>
          </div>
          {answer && (
            <div className="mt-4">
              <h1 className="text-3xl p-2 text-white font-bold">उत्तर</h1>
              <div className="bg-slate-700 p-4 mt-2 rounded-md">
                <p className="text-white text-2xl">{answer}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
