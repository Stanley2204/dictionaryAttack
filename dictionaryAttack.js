const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const dictionaryFile = path.join(__dirname, "500-worst-passwords.txt");

const targetHash = "578ed5a4eecf5a15803abdc49f6152d6";

async function dictionaryAttack() {
  const fileStream = fs.createReadStream(dictionaryFile);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  console.log("Starting dictionary attack...");

  for await (const password of rl) {
    const hash = crypto.createHash("md5").update(password.trim()).digest("hex");

    if (hash === targetHash) {
      console.log(`Bob's password is: ${password}`);
      return;
    }
  }

  console.log("Password not found in the dictionary.");
}

dictionaryAttack().catch((err) => console.error("Error during attack:", err));
