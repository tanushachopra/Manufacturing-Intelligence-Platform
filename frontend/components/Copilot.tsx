"use client";

import { FormEvent, useState } from "react";

import { askCopilot } from "@/services/api";


interface Message {
  role: "user" | "assistant";
  content: string;
}


export default function Copilot() {

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm FactoryOS Copilot. Ask me about your factory, machines, maintenance, anomalies, production, or machine health.",
    },
  ]);

  const [loading, setLoading] = useState(false);


  // =========================================================
  // SEND MESSAGE
  // =========================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    const message = input.trim();

    if (!message || loading) {
      return;
    }


    // Add user message immediately

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: message,
      },
    ]);


    setInput("");
    setLoading(true);


    try {

      console.log(
        "📤 Sending to FactoryOS Copilot:",
        message
      );


      const result = await askCopilot(message);


      console.log(
        "📥 Copilot result:",
        result
      );


      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",

          // Backend returns `answer`
          content:
            result.answer ||
            "No response received from Copilot.",
        },
      ]);


    } catch (error) {

      console.error(
        "❌ Copilot error:",
        error
      );


      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to FactoryOS Copilot. Please make sure the backend is running.",
        },
      ]);


    } finally {

      setLoading(false);

    }
  }


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="flex min-h-[650px] h-full flex-col rounded-3xl border border-cyan-500/20 bg-[#0D141C]">


      {/* HEADER */}

      <div className="border-b border-white/10 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">

            ✦

          </div>

          <div>

            <h1 className="text-lg font-semibold text-white">

              FactoryOS Copilot

            </h1>

            <p className="text-xs text-slate-400">

              AI-powered manufacturing intelligence

            </p>

          </div>

        </div>

      </div>


      {/* CHAT */}

      <div className="flex-1 space-y-5 overflow-y-auto p-6">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "bg-cyan-600 text-white"
                  : "border border-white/10 bg-[#17222D] text-slate-200"
              }`}
            >

              {message.content}

            </div>

          </div>

        ))}


        {/* LOADING */}

        {loading && (

          <div className="flex justify-start">

            <div className="rounded-2xl border border-white/10 bg-[#17222D] px-4 py-3 text-sm text-slate-400">

              Copilot is thinking...

            </div>

          </div>

        )}

      </div>


      {/* INPUT */}

      <div className="border-t border-white/10 p-5">

        <form
          onSubmit={handleSubmit}
          className="flex gap-3"
        >

          <input
            type="text"
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            disabled={loading}
            placeholder="Ask FactoryOS anything..."
            className="flex-1 rounded-xl border border-white/10 bg-[#111A23] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500/50"
          />


          <button
            type="submit"
            disabled={
              loading ||
              !input.trim()
            }
            className="rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {loading ? "..." : "Send"}

          </button>

        </form>

      </div>

    </div>

  );
}