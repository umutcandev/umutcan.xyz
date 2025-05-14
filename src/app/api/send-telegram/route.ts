import { NextRequest, NextResponse } from 'next/server';

// Optional: Configure this API route to run on edge runtime for better IP detection
// This enables the Vercel and Cloudflare headers
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, subject, message, userAgent, platform, vendor, language } = data;
    
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: 'Telegram configuration missing' },
        { status: 500 }
      );
    }

    // Get IP address from request with improved detection
    let ipAddress = 'unknown';
    let ipSource = 'Not detected';
    
    // Check for specific Vercel headers first (more reliable in production)
    if (request.headers.get('x-vercel-ip')) {
      ipAddress = request.headers.get('x-vercel-ip') || 'unknown';
      ipSource = 'x-vercel-ip';
    } else if (request.headers.get('x-vercel-forwarded-for')) {
      ipAddress = request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() || 'unknown';
      ipSource = 'x-vercel-forwarded-for';
    } else {
      // Check all common headers that might contain IP information
      const ipHeaders = [
        'x-forwarded-for',          // Most proxies, load balancers (AWS, GCP, etc.)
        'x-real-ip',                // Nginx
        'cf-connecting-ip',         // Cloudflare
        'true-client-ip',           // Akamai and others
        'x-client-ip',              // Some CDNs
        'forwarded',                // Standard header (RFC 7239)
        'x-forwarded',              // Non-standard but used
        'x-cluster-client-ip',      // GCP/AWS load balancer
        'fastly-client-ip',         // Fastly CDN
        'x-forwarded-host',         // Some proxies
        'appengine-user-ip',        // Google App Engine
        'x-appengine-user-ip'       // Google App Engine (alternative)
      ];
      
      for (const header of ipHeaders) {
        const headerValue = request.headers.get(header);
        if (headerValue) {
          // For x-forwarded-for and similar headers that may contain multiple IPs
          if (header === 'x-forwarded-for' || header === 'forwarded') {
            // Extract the first IP which is typically the client IP
            ipAddress = headerValue.split(',')[0].trim();
            ipSource = header;
            break;
          } else {
            ipAddress = headerValue.trim();
            ipSource = header;
            break;
          }
        }
      }
    }
    
    // Try getting IP from the user-agent client hints API if available
    const clientIP = request.headers.get('sec-ch-ua-client-ip');
    if (ipAddress === 'unknown' && clientIP) {
      ipAddress = clientIP;
      ipSource = 'sec-ch-ua-client-ip';
    }
    
    // Format the browser information
    let browserInfo = '';
    if (userAgent) browserInfo += `🌐 User Agent: ${userAgent}\n`;
    if (platform) browserInfo += `💻 Platform: ${platform}\n`;
    if (vendor) browserInfo += `🏢 Vendor: ${vendor}\n`;
    if (language) browserInfo += `🌍 Language: ${language}\n`;
    
    // Get the current time in local and UTC
    const now = new Date();
    const localTime = now.toLocaleString();
    const utcTime = now.toUTCString();
    
    // Format the message for Telegram with enhanced IP information
    const telegramMessage = `
🔔 New Contact Form Message

👤 Name: ${name}
📧 Email: ${email}
📝 Subject: ${subject}
💬 Message: ${message}

📌 Sender Information:
🌐 IP Address: ${ipAddress} (Source: ${ipSource})
⏰ Local Time: ${localTime}
🕒 UTC Time: ${utcTime}
${browserInfo}
🔍 IP Info: https://ipapi.co/${ipAddress}/json/
🗺️ IP Location: https://www.ipapi.co/${ipAddress}/
🔎 Additional IP Tools:
 - https://whatismyipaddress.com/ip/${ipAddress}
 - https://www.ip2location.com/demo/${ipAddress}
    `.trim();

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      return NextResponse.json(
        { error: 'Error sending to Telegram', details: errorData },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 