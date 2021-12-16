import { Dirent, readdirSync } from "fs";

// return a list of files in a directory
function readdirs(dir: string, suffix: string): string[] {
  const files: Dirent[] = readdirSync(dir, {
    withFileTypes: true,
  });

  let Files: string[] = [];

  for (const file of files) {
    if (file.isDirectory()) {
      Files = [...Files, ...readdirs(`${dir}/${file.name}`, suffix)];
    } else {
      Files.push(`${dir}/${file.name}`);
    }
  }

  return Files;
}

export { readdirs };
