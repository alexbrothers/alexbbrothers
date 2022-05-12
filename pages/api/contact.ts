import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

interface ContactRequest {
    name: string,
    replyTo: string,
    message: string,
}

interface Email {
  from: string,
  to: string,
  replyTo: string,
  subject: string,
  text: string,
}

interface ErrorResponse {
  error: string,
}

const emailBotUserName = process.env.EMAIL_BOT_USERNAME;
const emailBotDestinationEmail = process.env.EMAIL_BOT_DESTINATION_EMAIL;
const sendgridApiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendgridApiKey);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    const errorResponse: ErrorResponse = {
      error: "method not allowed",
    }
    return res.status(405).json(JSON.stringify(errorResponse));
  }
  if (req == null || req == undefined || req.body == null || req.body == undefined) {
    const errorResponse: ErrorResponse = {
      error: "request body is required",
    }
    return res.status(400).json(JSON.stringify(errorResponse));
  }
  const contactRequest: ContactRequest = {
    name: req.body.name,
    replyTo: req.body.email,
    message: req.body.message,
  }
  const email: Email = {
    from: emailBotUserName,
    to: emailBotDestinationEmail,
    replyTo: contactRequest.replyTo,
    subject: `Contact form sent from alexbrothers.dev by ${contactRequest.name}`,
    text: contactRequest.message,
  }
  try {
    await sgMail.send(email);
  } catch (e) {
    const errorResponse: ErrorResponse = {
      error: "unable to send email",
    }
    return res.status(500).json(JSON.stringify(errorResponse));
  }
  return res.status(200).json({message: "success"});
}