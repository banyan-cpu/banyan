import { x } from "./commands/x.js";
import { group } from "./commands/group.js";
import { create } from "./commands/group/admin/create.js";
import { describe } from "./commands/group/admin/describe.js";
import { del } from "./commands/group/admin/del.js";
import { list } from "./commands/group/admin/list.js";
import { invite } from "./commands/group/admin/invite.js";
import { join } from "./commands/group/member/join.js";
import { leave } from "./commands/group/member/leave.js";
import { kick } from "./commands/group/admin/kick.js";

group.addCommand(create);
group.addCommand(describe);
group.addCommand(del);
group.addCommand(list);
group.addCommand(invite);
group.addCommand(kick);
group.addCommand(join);
group.addCommand(leave);
x.addCommand(group);
x.parse();
