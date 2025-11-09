  export type DeepPartial<T> = T extends object
    ? T extends unknown[]
      ? T extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T
      : { [K in keyof T]?: DeepPartial<T[K]> }
    : T;
