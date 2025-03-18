const MarkovMachine = require("./markov");
const fs = require("fs");
const axios = require("axios");

async function urlRead(url) {
  try {
    const response = await axios.get(url);
    let content = response.data;
    return content;
  } catch (e) {
    console.log(`Error Fetching: ${url}`);
    console.log("Error:", e.message);
    process.exit(1);
  }
}

function fileread(path) {
  try {
    let content = fs.readFileSync(path, "utf8");
    return content;
  } catch (err) {
    console.log("ERROR:", err);
    process.exit(1);
  }
}

function isURL(str) {
  return str.startsWith("http://") || str.startsWith("https://");
}

async function main() {
  const args = process.argv.slice(2);

  let input = args[0];
  let content;

  if (isURL(input)) {
    content = await urlRead(input);
  } else {
    content = fileread(input);
  }

  let mm = new MarkovMachine(content);
  console.log(mm.makeText());
}

main();
