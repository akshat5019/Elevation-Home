import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { image } = await req.json();

  const result = streamText({
    model: anthropic('claude-3-5-sonnet-20240620'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: "You are an expert interior designer and architect. Analyze this room image and provide a 'Luxury Redesign Report'. Focus on: 1. Recommended Aesthetic, 2. Key Lighting enhancements, 3. Material & Texture suggestions. Keep the response concise but premium. Use markdown bold for highlights.",
          },
          {
            type: 'image',
            image: image, // This assumes a base64 string or URL
          },
        ],
      },
    ],
  });

  return result.toDataStreamResponse();
}
