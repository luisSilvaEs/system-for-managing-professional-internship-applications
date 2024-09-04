// /lib/email.tsx
import nodemailer from "nodemailer";

interface EmailData {
  opcionElegida?: "",
  periodoProyectado?: "",
  numeroResidentes?: "",
  nombre: "",
  apellidoPaterno?: "",
  apellidoMaterno?: "",
  carrera?: "",
  numeroControl?: "",
  domicilioCalle?: "",
  domicilioNumeroExterior?: "",
  domicilioNumeroInterior?: "",
  domicilioColonia?: "",
  domicilioCP?: "",
  ciudad?: "",
  telefonoOcelular?: "",
  email: "",
  nombreEmpresa: "",
  giroRamoSector?: "",
  otroRamoSector?: ""
}

// Function to send an email using nodemailer
export const sendConfirmationEmail = async ({
  nombre,
  email,
  nombreEmpresa,
}: EmailData): Promise<void> => {
  // Create a transporter using environment variables
  const transporter = nodemailer.createTransport({
    service: "hotmail", // Use your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // Ensure these environment variables are set in your .env.local file
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address from environment variables
    to: "siel.alb@gmail.com", // Replace with your destination email address
    subject: `New Application from ${nombre}`,
    text: `You have received a new application.\n\nName: ${nombre}\nEmail: ${email}\nMessage: ${nombreEmpresa}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email.");
  }
};
