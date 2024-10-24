import { exec } from 'child_process';
import fs from 'fs';
import ora from 'ora';
import { promisify } from 'util';
const execPromise = promisify(exec);
const writeFilePromise = promisify(fs.writeFile);
type ErrMessage = {
  message: string;
};
function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
async function runCommand(command: string): Promise<string | ErrMessage> {
  try {
    // Run the command and store the output as a Buffer
    const outputBuffer = await execPromise(command);

    // Convert the output Buffer to a string and return it
    return outputBuffer.stdout.toString();
  } catch (error) {
    // Handle any errors that occur during command execution
    return {
      message: `Error executing command: ${error}`,
    };
  }
}
async function generateEnvFile(
  envContent: string,
): Promise<string | ErrMessage> {
  try {
    await writeFilePromise('.env.local', envContent.trim());
    return 'success';
  } catch (error) {
    return {
      message: `Error generating .env.local file: ${error}`,
    };
  }
}
const getSecretNames = async () => {
  // two versions of this command
  let command = `vlt secrets`;
  let output = await runCommand(command);
  if (typeof output !== 'string') {
    command = `vlt secrets list`;
    output = await runCommand(command);
    if (typeof output !== 'string') {
      // its failed both commands. We need to log this error
      console.error(output.message);
      return [];
    }
  }
  const lines = output.split('\n');
  const secretNames = lines.slice(1, lines.length).map((line) => {
    const trimmedLine = line.trim();
    const name = trimmedLine.split(/ /g)[0];
    return name;
  });
  const names = secretNames.filter((name) => name);
  if (!names) return [];
  const contentArrPromise = names.map(async (str) => {
    // we have this delay so we don't exceed our rate limit of 5-10 requests per second
    await delay(500);
    const value = await runCommand(`vlt secrets get --plaintext ${str}`);
    if (typeof value !== 'string') return value;
    return str + '=' + `"${value.replace('\n', '')}"\n`;
  });
  const contentArr = await Promise.all(contentArrPromise);
  // log all errors from secrets
  contentArr.forEach((val, idx) => {
    if (typeof val !== 'string')
      console.error(`Error getting secret ${names[idx]}: ${val.message}`);
  });
  const filteredContentArr = contentArr.filter((val) => val) as string[];
  return filteredContentArr;
};

const main = async () => {
  // ensure we are logged out so we can refresh the token
  // However, this step's failure doesn't matter, as it
  // will only fail if we are already logged out
  await runCommand('vlt logout');
  // login
  const onLoginSpinner = ora('Logging in').start();
  await runCommand('vlt login');
  onLoginSpinner.succeed('Logged in');
  // fetch secrets
  const envSpinner = ora('Fetching secrets').start();
  // extract all secrets
  const filteredContentArr = await getSecretNames();
  envSpinner.succeed('Secrets fetched');
  if (filteredContentArr.length === 0) return;
  const content = filteredContentArr.reduce((a, b) => a + b);
  const fileSpinner = ora('Generating .env.local file').start();
  const result = await generateEnvFile(content);
  if (typeof result === 'string')
    fileSpinner.succeed('.env.local file generated');
  else return fileSpinner.fail(result.message);
  // logout to ensure we don't
  // have a stale token
  // next time it's run
  const logoutSpinner = ora('Logging out').start();
  await runCommand('vlt logout');
  logoutSpinner.succeed('Logged out');
};
if (require.main === module) main();
