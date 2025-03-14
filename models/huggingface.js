import { pipeline } from '@xenova/transformers';

class HuggingFaceModel {
    constructor() {
        this.model = null;
        this.init();
    }

    async init() {
        try {
            console.log('Initializing local model...');
            // Use a basic text generation model that's well-supported by transformers.js
            this.model = await pipeline('text-generation', 'Xenova/tiny-random-gpt2', {
                quantized: true,
                local: true,
                cache_dir: './models/cache'
            });
            console.log('Model loaded successfully');
        } catch (error) {
            console.error('Error initializing model:', error);
            throw error;
        }
    }

    async invoke(messages) {
        try {
            if (!this.model) {
                await this.init();
            }

            // Combine messages into a simple text prompt
            const prompt = messages.map(msg => {
                if (msg.role === 'system') {
                    return `Instructions: ${msg.content}\n\n`;
                }
                return `${msg.content}\n`;
            }).join('');

            // Generate response with basic parameters
            const result = await this.model(prompt, {
                max_new_tokens: 100,
                temperature: 0.7,
                do_sample: true
            });

            return {
                content: result[0].generated_text.replace(prompt, '').trim()
            };
        } catch (error) {
            console.error('Error generating response:', error);
            throw error;
        }
    }
}

const model = new HuggingFaceModel();
export default model;
