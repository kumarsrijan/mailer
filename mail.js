const { createTransport } = require("nodemailer")

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_PASS,
    },
});

exports.mailer = async ({ userEmail, data }) => {

    return await transporter.sendMail({
        from: `WebMavic Form ${userEmail}`,
        to: "webmavicofficial@gmail.com",
        subject: "Somebody just filled the form",
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              background: #6e28d9;
              padding: 0 24px;
              margin: 0;
              height: 100vh;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          </style>
        </head>
        
        <body>
        
          <h1>Form Submit by ${userEmail}</h1>
        
          ${JSON.stringify(data)}

        </body>
        
        </html>`,
    });
}