import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { ComplexityLevel } from '@prisma/client';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async executeAgent(agent: any, input: any) {
    const model = this.getModelByComplexity(agent.complexity);
    const maxTokens = this.getTokenLimitByComplexity(agent.complexity);

    const completion = await this.openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: agent.systemPrompt,
        },
        {
          role: 'user',
          content: JSON.stringify(input),
        },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
    });

    return {
      output: completion.choices[0].message.content,
      tokens: completion.usage?.total_tokens || 0,
    };
  }

  async generateSystemPrompt(specialty: string, description: string) {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at creating system prompts for AI agents.',
        },
        {
          role: 'user',
          content: `Create a detailed system prompt for an AI agent with specialty: ${specialty} and description: ${description}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  }

  private getModelByComplexity(complexity: ComplexityLevel): string {
    const models = {
      BASIC: 'gpt-3.5-turbo',
      INTERMEDIATE: 'gpt-4',
      ADVANCED: 'gpt-4-turbo',
      SUPREME: 'gpt-4o',
    };
    return models[complexity] || 'gpt-3.5-turbo';
  }

  private getTokenLimitByComplexity(complexity: ComplexityLevel): number {
    const limits = {
      BASIC: 1000,
      INTERMEDIATE: 2000,
      ADVANCED: 4000,
      SUPREME: 8000,
    };
    return limits[complexity] || 1000;
  }
}
