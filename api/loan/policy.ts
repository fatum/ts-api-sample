import { policy, User } from "../../operation/policy";
import { State } from "../../operation";

const adminPolicy = policy({
  isCan(user: User, state: State) {
    return user.roles.includes("admin");
  },
});

export { adminPolicy, User };
