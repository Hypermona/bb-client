import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function getData(url: string, isFullUrl = false) {
  // console.log(url, isFullUrl);
  const host = process.env.FETCH_HOST;
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  const URL = isFullUrl ? url : `${protocal}://${host + url}`;
  let res = await fetch(URL);
  console.log("reskkkkkkkkkkkkkkkkkkkkkkkkkkkkk", URL);
  if (!res.ok) {
    return {
      failed: true,
    };
  }
  return res.json();
}

export async function getAllPosts() {
  return cloudinary.search
    .expression(
      "folder:bb-admin/blogs/*" // add your folder
    )
    .sort_by("public_id", "desc")
    .max_results(10)
    .with_field("context")
    .execute()
    .then((result) => {
      console.log("77777777777777777777", typeof result?.resources);
      return result?.resources;
    })
    .catch((err) => console.log(err));
}

function testHasSpace(inputString: string) {
  let pattern = /\s/;
  return pattern.test(inputString);
}
function getTagsExp(tags: string[]) {
  let exp = "";
  if (tags?.length > 0) {
    exp = "tags:" + tags[0];
    if (tags.length > 1) {
      for (let i = 1; i < tags.length; i++) {
        if (tags[i] && testHasSpace(tags[i])) {
          exp += `OR tags:"${tags[i]}"`;
        } else {
          exp += " OR tags:" + tags[i];
        }
      }
    }
  }
  console.log("########################################", exp);
  return exp;
}
export async function getRelatedPosts(filename: string, type: any, price?: any, tags?: any) {
  console.log("filename???????????????????", filename);
  return cloudinary.search
    .expression(
      `folder:bb-admin/blogs/* AND ((${
        type === "PRODUCT" ? `context.price<=${(Number(price) || 0) + 5000} OR` : ""
      } ${getTagsExp(tags)} )  AND -filename=${filename}.json )`
    )
    .sort_by("public_id", "desc")
    .max_results(5)
    .with_field("context")
    .execute()
    .then((result) => {
      return result?.resources;
    })
    .catch((err) => {
      // console.log(err);
    });
}

export async function getURLData(url: string) {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
