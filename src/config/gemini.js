import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = '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'
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
	model: 'gemini-1.5-flash',
})

const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 40,
	maxOutputTokens: 8192,
	responseMimeType: 'text/plain',
}

async function run(prompt) {
	const chatSession = model.startChat({
		generationConfig,
		history: [],
	})

	const result = await chatSession.sendMessage(prompt)
	console.log(result.response.text())
	return result.response.text()
}

export default run
