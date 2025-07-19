import { writeFile, readFile } from "fs/promises";

const [_, __, id, committedBy, branch, commitHash, time] = process.argv;

const new_report = {
  id: Number(id),
  committedBy,
  branch,
  commitHash,
  time,
};

const file = await readFile("./reports.json", "utf-8");
const parsed = JSON.parse(file);

parsed.reports.unshift(new_report);

await writeFile("./reports.json", JSON.stringify(parsed, null, 2));
