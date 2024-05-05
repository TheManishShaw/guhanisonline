export async function getLoggedInUser() {
  try {
    // const { account } = await createSessionClient();
    // const result = await account.get();

    // const user = await getUserInfo({ userId: result.$id });
    const user = true;

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}
