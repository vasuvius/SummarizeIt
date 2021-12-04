import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChromeMessage, Sender } from "../types";
import { getCurrentTabUId, getCurrentTabUrl } from "../chrome/utils";

export const Home = () => {
    const [url, setUrl] = useState<string>('');
    const [responseFromContent, setResponseFromContent] = useState<string>('');
    // const [summarizationText, setSummarizationText] = useState<string>('');

    let {push} = useHistory();

    /**
     * Get current URL
     */
    useEffect(() => {
        getCurrentTabUrl((url) => {
            setUrl(url || 'undefined');
        })
    }, []);

    const sendTestMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "Hello from React",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (responseFromContentScript) => {
                    setResponseFromContent(responseFromContentScript);
                });
        });
    };

    const sendRemoveMessage = () => {
        const message: ChromeMessage = {
            from: Sender.React,
            message: "delete logo",
        }

        getCurrentTabUId((id) => {
            id && chrome.tabs.sendMessage(
                id,
                message,
                (response) => {
                    setResponseFromContent(response);
                });
        });
    };
    const summarize = () => {
        const OpenAI = require('openai-api');
        // Load your key from an environment variable or secret management service
        // (do not include your key directly in your code)
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        const openai = new OpenAI(OPENAI_API_KEY);
        (async () => {
            const gptResponse = await openai.complete({
                engine: 'davinci',
                prompt: 'this is a test',
                maxTokens: 5,
                temperature: 0.9,
                topP: 1,
                presencePenalty: 0,
                frequencyPenalty: 0,
                bestOf: 1,
                n: 1,
                stream: false,
                stop: ['\n', "testing"]
            });
        
            setResponseFromContent(gptResponse.data);
        })();

    }

    const summarizeMessage = () => {
        // this will take in all curenntly highlighted text and print them out
        // chrome.tabs.executeScript( {
        //     code: "window.getSelection().toString();"
        //   }, function(selection) {
        //     document.getElementById("output").value = selection[0];
        //   });

        // if (window.getSelection()?.toString != null){
        //     return alert(window.getSelection.toString);
        // }
        // chrome.tabs.executeScript( {
        //     code: "window.getSelection().toString();"
        //   }, function(selection) {
        //     alert(selection[0]);
        //   });
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
                    setResponseFromContent(response);
                    // summarize();
                });
        });
    };
    return (
        <div className="App">
            <header className="App-header">
                <p>Home</p>
                <p>URL:</p>
                <p>
                    {url}
                </p>
                <button onClick={sendTestMessage}>SEND MESSAGE</button>
                <button onClick={sendRemoveMessage}>Remove logo</button>
                <button onClick={summarizeMessage}>Summarize Message </button>
                <p>Response from content:</p>
                <p>
                    {responseFromContent}
                </p>
                <button onClick={() => {
                    push('/about')
                }}>About page
                </button>
            </header>
        </div>
    )
}
