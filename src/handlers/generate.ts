import { Configuration, OpenAIApi } from "openai";
import prisma from "../db";

const configuration = new Configuration({
    organization: "org-9xh1WVemIZUio2DjJhzbFU9u",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function generatePromptFormatter(req: any) {
    const {speech, partner, name, years} = req.body
    return `Write my ${speech} for my ${partner} ${name} who I have know for ${years} year(s).`
}

export const storeSpeech = async (req, res, prompt) => {
    const speech = await prisma.speech.create({
        data: {
            name: req.body.name,
            speech_type: req.body.type,
            years: req.body.years,
            speech: prompt,
            belongsToId: req.user.id,

        }
    })
}

export const generateSpeech = async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePromptFormatter(req),
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        if (req.body.save) {
            await storeSpeech(req, res, response.data.choices[0].text)
        }
        await res.status(200).json({result: response.data.choices[0].text});
    } catch (e) {
        await res.status(500).json({
            error: {
                message: 'An error occurred during your request.',
            }
        });
    }
}