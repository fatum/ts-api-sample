type Left<T> = { tag: "left"; value: T };
type Right<T> = { tag: "right"; value: T };
type Either<L, R> = Left<L> | Right<R>;

function match<L, R>(input: Either<L, R>, left: (left: L) => void, right: (right: R) => void) {
  switch (input.tag) {
    case "left":
      return left(input.value);
    case "right":
      return right(input.value);
  }
}

class Wrapper<T> {
  constructor(private _value: T | Promise<T>) {}

  async unwrap(): Promise<T> {
    if (this._value instanceof Promise) {
      return await this._value;
    } else {
      return this._value;
    }
  }
}

export { match, Left, Right, Either, Wrapper };
