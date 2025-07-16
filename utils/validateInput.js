function validateInput({ name, email, linkedin, github }) {
  if (!name || !email) {
    return { valid: false, message: "Name and email required." };
  }

  if (!email.includes("@") || !email.includes(".")) {
    return { valid: false, message: "Invalid email." };
  }

  const linkedInRegex =
    /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_.-]+\/?$/;
  const githubRegex = /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/?$/;

  if (linkedin && !linkedInRegex.test(linkedin)) {
    return {
      valid: false,
      message:
        "LinkedIn URL must be like: https://www.linkedin.com/in/your-profile",
    };
  }

  if (github && !githubRegex.test(github)) {
    return {
      valid: false,
      message: "GitHub URL must be like: https://github.com/your-username",
    };
  }

  return { valid: true };
}

module.exports = { validateInput };
