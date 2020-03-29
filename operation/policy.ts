import { State, step, ok, fail } from ".";

type User = { roles: string[] };
type Policy = { can(user: User, state: State): boolean };

const policy = (policy: Policy) => {
  return step("policy", (state: State) => {
    if (policy.can(state.user, state)) {
      return ok(state);
    } else {
      return fail("error");
    }
  });
};

export { policy, User };
