import { useState } from "react";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { subject: string; message: string } = {
      subject: "",
      message: "",
    };
    if (!subject.trim()) newErrors.subject = "Subject is required.";
    if (!message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return !newErrors.subject && !newErrors.message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubject("");
      setMessage("");
      setErrors({ subject: "", message: "" });
      setFormSubmitted(true);
    }
  };

  const handleBlur = (field: "subject" | "message") => {
    if (field === "subject" && !subject.trim()) {
      setErrors((prev) => ({ ...prev, subject: "Subject is required." }));
    }
    if (field === "message" && !message.trim()) {
      setErrors((prev) => ({ ...prev, message: "Message is required." }));
    }
  };

  return (
    <div>
      <h1>Contact</h1>
      {formSubmitted && (
        <p style={{ color: "green" }}>Form submitted successfully!</p>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          setFormSubmitted(false); // Reset message on subsequent submissions
        }}
      >
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onBlur={() => handleBlur("subject")}
          />
          {errors.subject && <p style={{ color: "red" }}>{errors.subject}</p>}
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => handleBlur("message")}
          />
          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
