export async function getData(url: string, isFullUrl = false) {
  // console.log(url, isFullUrl);
  const host = process.env.FETCH_HOST;
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  const URL = isFullUrl ? url : `${protocal}://${host + url}`;
  let res = await fetch(URL);
  console.log("reskkkkkkkkkkkkkkkkkkkkkkkkkkkkk", URL);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getURLData(url: string) {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
