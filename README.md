## 1. What it is:

SummarizeIt is a google chrome extension that summarizes any text. Highlight any text, fire up the SummarizeIt extension and it will summarize the text in under a second. 
![](./assets/readme/ex1.jpg)
![](./assets/readme/ex2.jpg)
## 2. How I built it:

Built using React. The summaries are generated using OpenAi's GPT-3 Davinci model. The powerful AI generates text based on an input. SummarizeIt uses TL:DR; (Too Long: Didn't Read) which is a capability of GPT-3. TL:DR; generates sumarries of input text which I then display in the SummarizeIt chrome extension.

## 2. How to build this extension:
Sign up for OpenAI access at https://beta.openai.com/

```
$ yarn
$ touch .env
$ echo "REACT_APP_OPENAI_API_KEY=$your_openAI_secret_key" > .env
$ yarn run build
```

## 3. How to add it to your Chrome browser:

![](./assets/readme/2020-12-04_15-18-20.jpg)

Select `/build` folder

Creds to Nemrosim for the Chrome React Framework:
[Chrome React Framework](https://github.com/nemrosim/chrome-react-extension-example)



