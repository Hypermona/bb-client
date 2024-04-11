import { v2 as cloudinary } from "cloudinary";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { PROCESSOR_LINK, unslugify } from "./helpers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function getData(url: string, isFullUrl = false) {
  const host = process.env.FETCH_HOST;
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  const URL = isFullUrl ? url : `${protocal}://${host + url}`;
  let res = await fetch(URL);
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
      "folder:" + process.env.MAIN_FOLDER + "/blogs/*" // add your folder
    )
    .sort_by("public_id", "desc")
    .with_field("context")
    .execute()
    .then((result) => {
      return result?.resources;
    })
    .catch((err) => console.log(err));
}

let prev: string | null = null;

export async function getPostsByPage(page: string) {
  return cloudinary.search
    .expression(
      "folder:" + process.env.MAIN_FOLDER + "/blogs/*" // add your folder
    )
    .sort_by("public_id", "desc")
    .max_results(12)
    .with_field("context")
    .next_cursor(page)
    .execute()
    .then((result) => {
      const res = { posts: result, prev };
      prev = page ?? "/";
      return res;
    })
    .catch((err) => {
      return { posts: [], prev };
    });
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
  return exp;
}
export async function getRelatedPosts(filename: string, type: any, price?: any, tags?: any) {
  return cloudinary.search
    .expression(
      `folder:${process.env.MAIN_FOLDER}/blogs/* AND ((${
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
    .catch(() => {});
}

export async function getURLData(url: string) {
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getProcessorPost(slug: string) {
  const querySnapshot = await getDocs(
    query(collection(db, "products"), where("features.chip.value", "==", slug))
  );
  let res: resProductFields[] = [];
  querySnapshot.forEach((doc) => {
    let data: ProductFields = <ProductFields>doc.data();
    res.push({ ...data, id: doc.id });
  });
  let postRes: any = { productCards: res };
  postRes["title"] = `The Mobile Phones With ${unslugify(slug)} Processor`;
  return postRes;
}

export async function getRelatedPost(slug: string) {
  const posts = await getData(PROCESSOR_LINK, true);
  return posts
    .filter((post: any) => post.value !== slug)
    .map((post: any) => ({
      context: {
        title: post?.label,
      },
      filename: post?.value,
    }));
}
