const { execSync } = require("child_process");
const fs = require("fs");
function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
function runCommand(command: string): string | null {
  try {
    // Run the command and store the output as a Buffer
    const outputBuffer = execSync(command);

    // Convert the output Buffer to a string and return it
    return outputBuffer.toString();
  } catch (error) {
    // Handle any errors that occur during command execution
    console.error(`Error executing command: ${error}`);
    return null;
  }
}
function generateEnvFile(envContent: string) {
  try {
    fs.writeFileSync(".env", envContent.trim());
    console.log(".env file generated successfully!");
  } catch (error) {
    console.error(`Error generating .env file: ${error}`);
  }
}
const getSecretNames = () => {
  const command = "vlt secrets";
  const output = runCommand(command);
  if (!output) return;
  const lines = output.split("\n");
  const secretNames = lines.slice(1, lines.length).map((line) => {
    const trimmedLine = line.trim();
    const name = trimmedLine.split(/ /g)[0];
    return name;
  });
  const filteredNames = secretNames.filter((name) => name);
  return filteredNames;
};

const main = async () => {
  try {
    runCommand("vlt logout");
  } catch (err) {
    console.log("No need to logout");
  }
  //login
  runCommand("vlt login");
  // Example usage
  const names = getSecretNames();
  if (!names) return;
  const contentArrPromise = names.map(async (str) => {
    //we have this delay so we don't exceed our rate limit of 5-10 requests per second
    await delay(500);
    const value = runCommand(`vlt secrets get --plaintext ${str}`);
    if (!value) return null;
    return str + "=" + value;
  });
  const contentArr = await Promise.all(contentArrPromise);
  //log all errors from secrets
  contentArr.forEach((val, idx) => {
    if (!val) console.error(`Error getting secret ${names[idx]}`);
  });
  const filteredContentArr = contentArr.filter((val) => val) as string[];
  const content = filteredContentArr.reduce((a, b) => a + b);
  generateEnvFile(content);
  //logout for secruity
  runCommand("vlt logout");
};
main();
