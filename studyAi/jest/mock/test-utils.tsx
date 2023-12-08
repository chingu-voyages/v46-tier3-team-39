// **Global Mocks**
// Any mocks included here, in `@/__tests__/test-utils`, apply to all tests.
// Due to Jest transformer issues, we mock next-auth's useSession hook directly:
export const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: {
    location: null,
    questionData: { generated: 3, answered: 3 },
    id: "6533f4c7489ef223ffc31a99",
    name: "Arky Asmal",
    email: "arkyasmal97@gmail.com",
    usersReached: 0,
    dateCreated: "2023-10-21T15:56:55.692Z",
    tags: [],
    school: "",
    emailVerified: null,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocJd8XtC4Rx_2sDVZ2V5Wbxyxz8ADpBTzpl3okklRBE8=s96-c",
  },
};
jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => ({
      data: mockSession,
      status: "authenticated",
    })),
  };
});
// Reference: https://github.com/nextauthjs/next-auth/discussions/4185#discussioncomment-2397318
// We also need to mock the whole next-auth package, since it's used in
// our various pages via the `export { getServerSideProps }` function.
jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn(),
  getServerSession: jest.fn(
    () =>
      new Promise((resolve) => {
        resolve(mockSession);
      })
  ),
}));

// Mock Next.js's useRouter hook using the "next-router-mock" package:
jest.mock("next/dist/client/router", () =>
  jest.requireActual("next-router-mock")
);
jest.mock("next/dist/shared/lib/router-context.shared-runtime", () => {
  const { createContext } = jest.requireActual("react");
  const router = jest.requireActual("next-router-mock").default;
  const RouterContext = createContext(router);
  return { RouterContext };
});
