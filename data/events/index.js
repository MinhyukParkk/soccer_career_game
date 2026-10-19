// Every event that can appear after a transfer window. To add one, put it
// in the file for its category (or a new file imported here).

import training from "./training.js";
import personal from "./personal.js";
import injury from "./injury.js";
import manager from "./manager.js";
import pressure from "./pressure.js";
import nationalTeam from "./nationalTeam.js";
import position from "./position.js";

export default [...training, ...personal, ...injury, ...manager, ...pressure, ...nationalTeam, ...position];