# Gmail SMTP Setup Guide

This guide will help you configure your portfolio to send contact form data to your Gmail using Gmail SMTP with your Google App Password.

## Step 1: Install Dependencies

Run this command in your project directory:
```bash
npm install
```

This will install all the necessary dependencies including:
- `nodemailer` - For sending emails via SMTP
- `cors` - For handling cross-origin requests
- `concurrently` - For running both frontend and backend servers

## Step 2: Create Environment Variables

1. Create a `.env` file in your project root (same directory as `package.json`)
2. Add your Gmail credentials:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-google-app-password
PORT=5000
```

**Important Security Notes:**
- `EMAIL_USER`: Your full Gmail address
- `EMAIL_PASS`: Your Google App Password (NOT your regular Gmail password)
- The `.env` file is already in `.gitignore`, so it won't be committed to version control

## Step 3: Configure Gmail App Password (If Not Done Already)

If you haven't created a Google App Password yet:

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to "Security" → "2-Step Verification" (you must have 2FA enabled)
3. Scroll down to "App passwords"
4. Select "Mail" and your device
5. Copy the generated 16-character app password
6. Use this password in your `.env` file

## Step 4: Update Backend Configuration (Optional)

If you want to send emails to a different Gmail address:

Edit the `server.js` file and change this line:
```javascript
to: emailUser, // Change this to your desired recipient email
```

## Step 5: Start Your Development Server

Run the following command to start both the frontend and backend servers:
```bash
npm run dev
```

This will:
- Start the Express server on port 5000
- Start the Vite development server on port 5173
- Enable API communication between frontend and backend

## Step 6: Test Your Contact Form

1. Open your portfolio in the browser (usually http://localhost:5173)
2. Fill out the contact form with test data
3. Submit the form
4. Check your Gmail inbox for the test message

## Expected Email Format

You should receive an email with:
- Subject: "New Contact Form Submission - [Service Name]"
- Reply-to: Set to the visitor's email address
- Formatted HTML content with all submission details
- Timestamp of when the form was submitted

## Troubleshooting

### Common Issues:

1. **Authentication Error**
   - Ensure you're using your Google App Password, not your regular Gmail password
   - Verify 2-Factor Authentication is enabled on your Google account

2. **CORS Error**
   - The backend is configured to handle CORS automatically
   - Make sure both frontend and backend servers are running

3. **Connection Error**
   - Check that your internet connection is stable
   - Verify Gmail SMTP is accessible from your location

4. **Email Not Received**
   - Check your spam/junk folder
   - Verify the recipient email in `server.js` is correct
   - Check the server console for any error messages

### Testing the Backend API

You can test the email API directly using curl:

```bash
curl -X POST http://localhost:5000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "Web Development",
    "message": "This is a test message"
  }'
```

## Security Best Practices

1. **Never commit `.env` to version control** - It's already in `.gitignore`
2. **Use strong app passwords** - Google generates secure 16-character passwords
3. **Monitor email usage** - Gmail has daily sending limits
4. **Consider using a dedicated email** - For better organization and security

## Production Deployment

For production deployment:
1. Set environment variables on your hosting platform
2. Update CORS settings if needed in `server.js`
3. Consider using a more robust email service for high-volume applications

## Gmail Sending Limits

- **Free Gmail accounts**: 500 emails per day
- **Google Workspace**: 2,000 emails per day
- **Per recipient limits**: 100 recipients per email

This should be more than sufficient for a personal portfolio contact form.