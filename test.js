import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const FILE_PATH = "./data.json";
const git = simpleGit();

const makeCommit = async (n) => {
  if (n === 0) {
    console.log("✅ All commits done, pushing...");
    await git.push();
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);

  const date = moment()
    .subtract(1, "year")
    .add(x, "weeks")
    .add(y, "days")
    .format();

  const data = { date };
  console.log(`📅 Commit #${n}: ${date}`);

  await jsonfile.writeFile(FILE_PATH, data);
  await git.add(FILE_PATH);
  await git.commit(date, { "--date": date });

  makeCommit(n - 1);
};

makeCommit(100);