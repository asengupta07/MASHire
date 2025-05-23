import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from 'dotenv';
dotenv.config();


const BASE_URL_WITH_PROXY = `${process.env.ALCHEMYST_API_URL}/proxy/${process.env.ALCHEMYST_BASE_URL}/${process.env.OPENAI_API_KEY}`;

console.log(BASE_URL_WITH_PROXY);

const lcClientWithProxy = new ChatOpenAI({
    apiKey: 'sk-H63OD-3KZJD-U1VW8-C0CAT',
    model: 'alchemyst-ai/alchemyst-c1',
    configuration: {
      baseURL: BASE_URL_WITH_PROXY
    },
  });

export const generate = async (prompt: string) => {
    const response = await lcClientWithProxy.invoke([
        {
            role: 'user',
            content: prompt
        }
    ]);
    return response.content;
}


// Example usage
const response = await generate('Hello, how are you?');
console.log(response);



