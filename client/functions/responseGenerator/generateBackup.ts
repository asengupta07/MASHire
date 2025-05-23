import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDTH5jjua96R-W5SFYFk5SD7DfQJ1treNw';

export const generate = async (prompt: string, options: {
    chatId?: string;
    username?: string;
    source?: string;
    title?: string;
    persona?: string;
    tools?: {
        researchIcps?: boolean;
    };
    scope?: string;
    stream?: boolean;
    voice?: boolean;
    fastContext?: any[];
} = {}) => {
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Construct the prompt with context if available
        let fullPrompt = prompt;
        if (options.fastContext && options.fastContext.length > 0) {
            fullPrompt = `Context: ${JSON.stringify(options.fastContext)}\n\nUser Query: ${prompt}`;
        }

        const result = await model.generateContent(fullPrompt);
        const response = result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error('Error generating response with Gemini:', error);
        throw error;
    }
}

// Example usage:
// const response = await generate('Hello, how are you?');
// console.log(response); 