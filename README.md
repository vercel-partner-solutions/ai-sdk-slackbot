# AI SDK Slackbot

An AI-powered chatbot for Slack powered by the [AI SDK by Vercel](https://sdk.vercel.ai/docs).

## Features

- Integrates with [Slack's API](https://api.slack.com) for easy Slack communication
- Use any LLM with the AI SDK ([easily switch between providers](https://sdk.vercel.ai/providers/ai-sdk-providers))
- Works both with app mentions and as an assistant in direct messages
- Maintains conversation context within both threads and direct messages
- Built-in tools for enhanced capabilities:
  - Real-time weather lookup
  - Web search (powered by [Exa](https://exa.ai))
- Easily extensible architecture to add custom tools (e.g., knowledge search)
- Development mode for easy local testing
- HTTP endpoints for production deployment

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- Slack workspace with admin privileges
- [OpenAI API key](https://platform.openai.com/api-keys)
- [Exa API key](https://exa.ai) (for web search functionality)
- A server or hosting platform (e.g., [Vercel](https://vercel.com)) to deploy the bot

## Setup

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Create a Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps) and click "Create New App"
2. Choose "From scratch" and give your app a name
3. Select your workspace

### 3. Configure Slack App Settings

#### Basic Information
- Under "App Credentials", note down your "Signing Secret"

#### Socket Mode (for Development)
- Enable [Socket Mode](https://api.slack.com/apis/connections/socket)
- Create an app-level token with `connections:write` scope
- Note down the App-Level Token (starts with `xapp-`)

#### OAuth & Permissions
- Add the following [Bot Token Scopes](https://api.slack.com/scopes):
  - `app_mentions:read`
  - `chat:write`
  - `im:history`
  - `im:read`
  - `im:write`

- Install the app to your workspace and note down the "Bot User OAuth Token"

### 4. Set Environment Variables

Create a `.env` file in the root of your project with the following:

```
# Slack Credentials
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret

# Development mode settings
NODE_ENV=development
SLACK_APP_TOKEN=xapp-your-app-token

# OpenAI Credentials
OPENAI_API_KEY=your-openai-api-key

# Exa API Key (for web search functionality)
EXA_API_KEY=your-exa-api-key
```

Replace the placeholder values with your actual tokens.

## Local Development

Use the [Vercel CLI](https://vercel.com/docs/cli) and [localtunnel](https://github.com/localtunnel/localtunnel) to test out this project locally:

```sh
pnpm i -g vercel
pnpm vercel dev --listen 3000 --yes
```

```sh
npx localtunnel --port 3000
```

Make sure to modify the [subscription URL](./README.md/#enable-slack-events) to the `localtunnel` URL.

## Production Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository

2. Deploy to [Vercel](https://vercel.com):
   - Go to vercel.com
   - Create New Project
   - Import your GitHub repository

3. Add your environment variables in the Vercel project settings:
   - `SLACK_BOT_TOKEN`
   - `SLACK_SIGNING_SECRET`
   - `OPENAI_API_KEY`
   - `EXA_API_KEY`
   
   Note: Do NOT set `NODE_ENV` or `SLACK_APP_TOKEN` in production

4. After deployment, Vercel will provide you with a production URL

5. Update your Slack App configuration:
   - Go to your [Slack App settings](https://api.slack.com/apps)
   - Select your app
   - Disable Socket Mode (it's only for development)
   - Go to "Event Subscriptions"
   - Enable Events
   - Set the Request URL to: `https://your-app.vercel.app/api/events`
   - Save Changes

## Usage

The bot will respond to:

1. Direct messages - Send a DM to your bot
2. Mentions - Mention your bot in a channel using `@YourBotName`

The bot maintains context within both threads and direct messages, so it can follow along with the conversation.

### Available Tools

1. **Weather Tool**: The bot can fetch real-time weather information for any location.
   - Example: "What's the weather like in London right now?"

2. **Web Search**: The bot can search the web for up-to-date information using [Exa](https://exa.ai).
   - Example: "Search for the latest news about AI technology"
   - You can also specify a domain: "Search for the latest sports news on bbc.com"

### Extending with New Tools

The chatbot is built with an extensible architecture using the [AI SDK's tool system](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling). You can easily add new tools such as:
- Knowledge base search
- Database queries
- Custom API integrations
- Company documentation search

To add a new tool, extend the tools object in the `lib/ai.ts` file following the existing pattern.

## License

ISC 