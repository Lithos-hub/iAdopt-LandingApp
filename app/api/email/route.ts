import { AdopterData } from "@/interfaces";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

const createTransporter = () => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY as string,
    })
  );
  return transport;
};

const getEmailTemplate = (
  chat: string,
  valoration: string,
  adopterData: AdopterData
) => `
<main
    style="
    background: #202020;
    margin: 0;
    padding: 20px;
    border-radius: 25px;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';">

        <div style="display: flex; justify-content: center;">
            <img src="cid:logo" style="
            border-radius: 25px;
            margin: 0 auto;
            width: 50vw;
            " />
        </div>

        <hr />

        <h2>
        ¡Hola! El adoptante ${adopterData.fullname} con la dirección de correo ${adopterData.email} ha completado la entrevista de adopción, a continuación podrás ver la entrevista completa junto a nuestra valoración:
        </h2>

        <p>
            ${chat}
        </p>

        <hr />

        <h3>${valoration}</h3>
</main>
`;

export async function POST(req: Request) {
  const { adopterData, formattedChat, valoration, email } = await req.json();
  try {
    const transporter = createTransporter();

    const htmlChat = formattedChat.split("\n").join("<br />");

    await transporter.sendMail({
      from: process.env.SENDGRID_FROM_EMAIL,
      to: email,
      subject: `Entrevista a ${adopterData.fullname} - Resultados`,
      html: getEmailTemplate(htmlChat, valoration.content, adopterData),
      attachments: [
        {
          filename: "email-banner.jpg",
          path: "https://user-images.githubusercontent.com/57297760/245075718-31c0c86c-8038-4159-bb03-22556b18b602.jpg",
          cid: "logo",
        },
      ],
    });
    return NextResponse.json({ message: "Valoration submitted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error sending email", error });
  }
}
