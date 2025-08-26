import { WebClient, type ChatPostMessageArguments } from "@slack/web-api";

const SLACK_ENABLED = process.env.SLACK_BOT_TOKEN && process.env.SLACK_CHANNEL_ID;

const slack = SLACK_ENABLED ? new WebClient(process.env.SLACK_BOT_TOKEN) : null;

/**
 * Sends a structured message to a Slack channel using the Slack Web API
 */
export async function sendSlackMessage(
  message: ChatPostMessageArguments
): Promise<string | undefined> {
  if (!SLACK_ENABLED || !slack) {
    console.log('Slack not configured, skipping message:', message.text || 'No text');
    return undefined;
  }
  
  try {
    const response = await slack.chat.postMessage(message);
    return response.ts;
  } catch (error) {
    console.error('Error sending Slack message:', error);
    throw error;
  }
}

/**
 * Sends a contact form submission to Slack
 */
export async function sendContactFormToSlack(formData: {
  name: string;
  phone: string;
  email: string;
  budget?: string;
  message: string;
}) {
  if (!SLACK_ENABLED) {
    console.log('Slack not configured, contact form data:', formData);
    return;
  }

  const { name, phone, email, budget, message } = formData;
  
  await sendSlackMessage({
    channel: process.env.SLACK_CHANNEL_ID!,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🆕 새로운 프로젝트 문의',
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*이름:*\n${name}`
          },
          {
            type: 'mrkdwn',
            text: `*연락처:*\n${phone}`
          },
          {
            type: 'mrkdwn',
            text: `*이메일:*\n${email}`
          },
          {
            type: 'mrkdwn',
            text: `*예산:*\n${budget || '미선택'}`
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*프로젝트 내용:*\n${message}`
        }
      },
      {
        type: 'context',
        elements: [
          {
            type: 'plain_text',
            text: `문의 시간: ${new Date().toLocaleString('ko-KR')}`
          }
        ]
      }
    ]
  });
}
