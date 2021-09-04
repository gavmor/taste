export const allTestCases = []

export function test(subject, definitions) {
  allTestCases.push(
    ...Object.entries(definitions)
      .map(([behavior, fn]) =>
        TestCase(`${subject} ${behavior}`, fn))
  )
}

export function expect(subject, expectation, ...args) {
  const pass = expectation(subject, ...args)
  // if the expectation returns a function, that's almost
  // certainly a mistake on the part of the test-writer.
  // Possibly they forgot to pass all needed arguments to
  // a curried function.
  if (!pass || typeof pass === "function") {
    throw {
      isExpectationFailure: true,
      subject,
      expectation,
      args,
    }
  }
}

function TestCase(title, fn) {
  return {title, fn}
}
