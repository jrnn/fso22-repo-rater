export const assertNever = (_: never): never => {
  throw new Error(""
    + "In an ideal world, you will never ever see this error. "
    + "So, if you're seeing this, it means you're living in a nightmare world."
  )
}

export const doNothing = () => { /**/ }

// I know I know, this is hideous ... :)
//
export const toYyyyMmDd = (dateString: string): string => {
  try {
    const date = new Date(Date.parse(dateString))
    const yyyyMmDd = date.toISOString().split("T")[0] || "N/A"
    return yyyyMmDd.replaceAll("-", ".")
  } catch (error) {
    return "N/A"
  }
}
