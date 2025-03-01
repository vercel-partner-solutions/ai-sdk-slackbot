# Slack AI Chatbot

A simple AI-powered chatbot for Slack that uses the Vercel AI SDK and OpenAI to provide intelligent responses to messages.

## Features

- Integrates with Slack's Bolt SDK for easy Slack communication
- Uses OpenAI's GPT models through the Vercel AI SDK
- Maintains conversation context within message threads
- Development mode for easy local testing
- HTTP endpoints for production deployment

## Prerequisites

- Node.js 18+ installed
- Slack workspace with admin privileges
- OpenAI API key
- A server or hosting platform (e.g., Vercel) to deploy the bot

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create a Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps) and click "Create New App"
2. Choose "From scratch" and give your app a name
3. Select your workspace

### 3. Configure Slack App Settings

#### Basic Information
- Under "App Credentials", note down your "Signing Secret"

#### Socket Mode (for Development)
- Enable Socket Mode
- Create an app-level token with `connections:write` scope
- Note down the App-Level Token (starts with `xapp-`)

#### OAuth & Permissions
- Add the following Bot Token Scopes:
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
```

Replace the placeholder values with your actual tokens.

## Local Development

The bot includes a development mode that uses Slack's Socket Mode for easy local testing without requiring public URLs.

1. Make sure your `.env` file includes:
   ```
   NODE_ENV=development
   SLACK_APP_TOKEN=xapp-your-app-token
   ```

2. Start the bot:
   ```bash
   npm run dev
   ```

3. The bot will connect to Slack using Socket Mode and be ready to respond to:
   - Direct messages
   - Channel mentions

No public URL or tunneling is required for local development!

## Production Deployment

### Deploying to Vercel

1. Install Vercel CLI (optional but recommended):
   ```bash
   npm install -g vercel
   ```

2. Push your code to a GitHub repository

3. Deploy to Vercel:
   ```bash
   # If using Vercel CLI:
   vercel

   # Or deploy via Vercel Dashboard:
   # - Go to vercel.com
   # - Create New Project
   # - Import your GitHub repository
   ```

4. Add your environment variables in the Vercel project settings:
   - `SLACK_BOT_TOKEN`
   - `SLACK_SIGNING_SECRET`
   - `OPENAI_API_KEY`
   
   Note: Do NOT set `NODE_ENV` or `SLACK_APP_TOKEN` in production

5. After deployment, Vercel will provide you with a production URL

6. Update your Slack App configuration:
   - Go to your [Slack App settings](https://api.slack.com/apps)
   - Select your app
   - Disable Socket Mode (it's only for development)
   - Go to "Event Subscriptions"
   - Enable Events
   - Set the Request URL to: `https://your-app.vercel.app/slack/events`
   - Save Changes

## Usage

The bot will respond to:

1. Direct messages - Send a DM to your bot
2. Mentions - Mention your bot in a channel using `@YourBotName`

The bot maintains context within threads, so it can follow along with the conversation.

## Health Check

The bot includes a health check endpoint at `/health` that returns "OK" when the service is running.
This endpoint is only available in production mode.

## Customization

- Modify the system prompt in `src/index.ts` to change the bot's personality or instructions
- Change the OpenAI model by updating the `openai('gpt-4o')` parameter
- Adjust the history management to retain more or less conversation context

## License

ISC 