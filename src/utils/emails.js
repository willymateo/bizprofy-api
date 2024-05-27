const { EMAIL_VERIFICATION_MINUTES_TO_EXPIRE } = require("../constants");

const getEmailVerificationBody = ({ token = "", user = {} } = {}) => {
  const emailVerificationLink = `${process.env.BIZPROFY_DASHBOARD_URL}/auth/emailVerification/${token}`;

  return `
        <h1>Hi ${user.firstNames ?? ""} 👋, verify your account</h1>

        <p>Thanks for signing up for Bizprofy! We're excited to have you on board. To verify your account, please follow the button below.</p>

        <p>This link will expire in ${EMAIL_VERIFICATION_MINUTES_TO_EXPIRE} minutes.</p>

        <a href="${emailVerificationLink}">
          <button>Verify account</button>
        </a>

        <p>
          If you can't click the button, please copy and paste the following link in your browser:
          <strong>${emailVerificationLink}</strong>
        </p>
      `;
};

const getWelcomeEmailBody = ({ user = {} } = {}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Bizprofy</title>
  </head>
  <body>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
              <td align="center" bgcolor="#f7f7f8" style="padding: 20px 0;">
                  <table width="600" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e0e0e0; background-color: #ffffff;">
                      <tr>
                          <td align="center" bgcolor="#1877F2" style="padding: 20px 0; color: #ffffff; font-size: 24px; font-family: Arial, sans-serif;">
                              Welcome to Bizprofy!
                          </td>
                      </tr>
                      <tr>
                          <td style="padding: 20px; font-family: Arial, sans-serif; font-size: 16px; color: #333333;">
                              <p>Dear ${user?.firstNames},</p>
                              <p>We are delighted to welcome you to Bizprofy!</p>
                              <p>Bizprofy is your new SaaS platform to efficiently and effectively manage your company's inventory. We are thrilled that you have decided to join our community, and we are here to help you optimize your inventory processes.</p>
                              <h3>What can you expect from Bizprofy?</h3>
                              <ul>
                                  <li><strong>Simplified Inventory Management:</strong> Our platform allows you to control your stock in real-time, reduce costs, and improve operational efficiency.</li>
                                  <li><strong>Detailed Reports:</strong> Access accurate and personalized reports to make informed decisions about your inventory.</li>
                                  <li><strong>Intuitive Interface:</strong> A user-friendly and simple experience so you can focus on what really matters: growing your business.</li>
                              </ul>
                              <h3>Get Started Now!</h3>
                              <p>To start taking advantage of all the benefits Bizprofy has to offer, simply log into your account and follow these steps:</p>
                              <ol>
                                  <li><strong>Complete Your Profile:</strong> Provide basic information about your company to personalize your experience.</li>
                                  <li><strong>Add Your Inventory:</strong> Upload your product details and start managing your inventory immediately.</li>
                                  <li><strong>Explore Features:</strong> Take some time to familiarize yourself with the various tools and functionalities of Bizprofy.</li>
                              </ol>
                              <p>Best regards,</p>
                              <p><strong>The Bizprofy Team</strong><br>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" bgcolor="#f7f7f7" style="padding: 20px; font-family: Arial, sans-serif; font-size: 12px; color: #666666;">
                              &copy; 2024 Bizprofy. All rights reserved.
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
</html>
`;

module.exports = { getEmailVerificationBody, getWelcomeEmailBody };
