import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ChromeMessage, Sender } from "../types";
import { getCurrentTabUId } from "../chrome/utils";

export const Home = () => {
    const [responseFromContent, setResponseFromContent] = useState<string>('');

    let {push} = useHistory();

    const summarizeMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "Summarize Data",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (response) => {
                    // at this point, we have the text from the DOM element
                    const OpenAI = require('openai-api');
                    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
                    const openai = new OpenAI(OPENAI_API_KEY);
                    response += ".tl;dr:";
                    (async () => {
                        const gptResponse = await openai.complete({
                            engine: 'davinci',
                            prompt: response,
                            maxTokens: 50,
                            temperature: 0.4,
                            topP: 1,
                            presencePenalty: 0,
                            frequencyPenalty: 0,
                            bestOf: 1,
                            n: 1,
                            stream: false,

                        });
                        setResponseFromContent(gptResponse.data.choices[0].text);
                    })();
                });
        });
    };
    return (
        <div className="App">
            <header className="App-header">
                <h3>SummarizeIt</h3>
                <button onClick={summarizeMessage}>Summary </button>
                <p>Summary:</p>
                <p>
                    {responseFromContent}
                </p>
                <div className="App-footer">
                    <button onClick={() => {
                        push('/about')
                    }}>About page
                    </button>
                </div>
                <p> Built by Jack Vasu</p>
            </header>
        </div>
    )
}
