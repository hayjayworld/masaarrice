export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MASAAR Website <onboarding@resend.dev>",
        to: "murphy99@gmail.com", // 🔴 CHANGE THIS TO OWNER EMAIL
        subject: `New Contact Message from ${name}`,
        html: `
          <h2>New Website Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({ error: data });
    }

    return res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}