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
    <div align="center" style="
      background: #0f172a; 
      padding: 15px; 
      border-radius: 30px;       
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol'">

        <img
          src="cid:logo"
          style="margin: 0 auto; width: 100%; border: 1px solid #ffffff20;  border-radius: 30px; min-height: 100px; margin-bottom: 15px;"
        />

      <div style="background: white; padding: 30px; border-radius: 30px; box-shadow: 0px 20px 50px #50505050;">

      <p>
        ¡Hola! El adoptante <strong style="color: #f43f5e;">${adopterData.fullname}</strong> con la dirección de correo electrónico
        <strong>${adopterData.email}</strong> ha completado la entrevista de adopción. 
        
        <br /> <br />

        A continuación podrás ver la entrevista completa junto a nuestra
        valoración.
      </p>

      <h2 style="color: #f43f5e; text-align: center; text-transform: uppercase;">Transcripción de la conversación</h2>

      <p>
        ${chat}
      </p>

      <hr style="opacity: 0.5;" />

      <h2 style="color: #f43f5e; text-align: center; text-transform: uppercase;">Análisis y valoración</h2>

      <p>${valoration}</p>
    </div>
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
          path: "https://user-images.githubusercontent.com/57297760/246410881-419a79cf-fa94-43ac-bf5e-4c6233180f54.jpg",
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
