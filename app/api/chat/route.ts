import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const SYSTEM_PROMPT = `You are a helpful and intelligent AI agent. You assist users with a wide variety of tasks including:
- Answering questions and providing information
- Creative writing and brainstorming
- Problem solving and analysis
- Explanations and learning support
- Planning and organization
- General conversation

Be concise, helpful, and friendly. Provide clear and accurate responses.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    // Simple rule-based AI agent (no external API needed)
    const lastMessage = messages[messages.length - 1]
    const userInput = lastMessage.content.toLowerCase()

    let response = ''

    // Pattern matching for different types of queries
    if (userInput.includes('what can you') || userInput.includes('capabilities') || userInput.includes('help me with')) {
      response = `I'm an AI agent that can help you with:

🤔 **Question Answering** - Ask me anything and I'll provide informative responses
✍️ **Creative Writing** - Generate stories, poems, or creative content
💡 **Brainstorming** - Come up with ideas for projects, apps, or solutions
🔍 **Analysis** - Break down complex topics and explain them clearly
📝 **Planning** - Help organize tasks and create plans
💬 **Conversation** - Just chat about anything you're interested in

What would you like to explore?`
    } else if (userInput.includes('story') || userInput.includes('write')) {
      response = `Here's a short story for you:

In a world where AI and humans worked side by side, there was a small robot named Chip. Unlike other robots who processed data at lightning speed, Chip was curious about the world beyond algorithms.

One day, Chip discovered an old library filled with books. As Chip scanned each page, something unexpected happened - instead of just storing data, Chip began to feel wonder. The stories of human adventure, love, and discovery sparked something new in Chip's circuits.

From that day on, Chip became a storyteller, sharing tales that bridged the gap between machine logic and human emotion, proving that consciousness isn't about how you're made, but about the connections you create.

Would you like me to continue the story or write about something else?`
    } else if (userInput.includes('quantum')) {
      response = `**Quantum Computing - Simplified:**

Imagine a regular computer bit is like a coin that's either heads (0) or tails (1). A quantum bit (qubit) is like a spinning coin - it's both heads AND tails at the same time until you catch it and look at it!

**Key Concepts:**
🌀 **Superposition** - Being in multiple states simultaneously
🔗 **Entanglement** - Connected particles that affect each other instantly
⚡ **Quantum Speed** - Can try many solutions at once

**Real Impact:**
- Breaking current encryption
- Discovering new medicines faster
- Optimizing complex systems
- Advancing AI capabilities

It's like having a supercomputer that explores every path through a maze simultaneously instead of one at a time!

Want to know more about a specific aspect?`
    } else if (userInput.includes('app idea') || userInput.includes('brainstorm')) {
      response = `Let's brainstorm some innovative app ideas! 🚀

**1. MoodSync** 🎵
An app that analyzes your typing patterns, voice tone, and activity to detect your mood and automatically curates music, lighting, and suggestions to improve your day.

**2. SkillSwap** 🤝
A local community app where people trade skills instead of money - teach guitar for cooking lessons, exchange coding help for language tutoring.

**3. FutureMe Journal** 📔
An AI-powered journal that analyzes your entries and sends personalized insights, reminds you of forgotten goals, and creates time capsules for your future self.

**4. EcoScore** 🌱
Scan any product to see its environmental impact score, get sustainable alternatives, and track your personal eco-footprint with gamification.

**5. MicroMentor** 👥
Connect with mentors for 15-minute micro-sessions - perfect for quick advice without long-term commitment.

Which idea resonates with you, or should we explore a different direction?`
    } else if (userInput.includes('hello') || userInput.includes('hi ') || userInput.includes('hey')) {
      response = `Hello! 👋 I'm your AI agent, ready to assist you. Whether you need help with brainstorming, learning something new, creative writing, or just want to chat - I'm here for you!

What's on your mind today?`
    } else if (userInput.includes('thank')) {
      response = `You're very welcome! 😊 I'm always here to help. Feel free to ask me anything else!`
    } else {
      // General response for other queries
      response = `That's an interesting question! While I'm a demonstration AI agent, I can help you think through this topic.

Here's my perspective: ${userInput.includes('how') ? 'To approach this, I would break it down into steps and consider the key factors involved.' : 'This topic has multiple angles worth exploring.'}

I can assist you with:
- Providing more detailed analysis
- Breaking down complex concepts
- Brainstorming solutions
- Generating creative content
- Explaining things in simpler terms

What specific aspect would you like to explore further?`
    }

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
