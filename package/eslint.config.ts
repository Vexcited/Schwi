import vexcited from "@vexcited/eslint-config";
import { globalIgnores } from "eslint/config";

export default [
  globalIgnores(["**/android/", "**/ios/"]),
  ...await vexcited()
];
