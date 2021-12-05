import React from "react";
import { useHistory } from "react-router-dom";

export const About = () => {
    let {push} = useHistory();
    return (
        <div className="App">
            <header className="App-header">
                <h3>SummarizeIt</h3>
                <p>SummarizeIt is a summarization tool backed by OpenAI's GPT-3 Davinci model. This tool can be used to summarize any text within ~reasonable~ length.</p>
                <button onClick={() => {
                    push('/')
                }}>Home Page
                </button>
                <p>Built by Jack Vasu</p>
            </header>
        </div>
    )
}
