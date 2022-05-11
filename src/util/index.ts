export const assertNever = (_: never): never => {
  throw new Error(""
    + "In an ideal world, you will never ever see this error. "
    + "So, if you're seeing this, it means you're living in a nightmare world."
  )
}

export const doNothing = () => { /**/ }
