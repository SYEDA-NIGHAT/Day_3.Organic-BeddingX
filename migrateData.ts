// import sanityClient from "@sanity/client";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const client = sanityClient({
//   projectId: process.env.SANITY_PROJECT_ID!,
//   dataset: process.env.SANITY_DATASET!,
//   useCdn: false,
//   apiVersion: "2023-01-01",
//   token: process.env.SANITY_API_TOKEN!,
// });

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// }

// const fetchBeddingData = async (): Promise<Product[]> => {
//   try {
//     const response = await axios.get<Product[]>("https://example.com/api/products");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return [];
//   }
// };

// const migrateDataToSanity = async () => {
//   const beddingData = await fetchBeddingData();

//   if (!beddingData.length) {
//     console.log("No data available to migrate.");
//     return;
//   }

//   for (const item of beddingData) {
//     try {
//       const doc = {
//         _type: "product",
//         title: item.name,
//         description: item.description,
//         price: item.price,
//         image: {
//           _type: "image",
//           asset: {
//             _type: "reference",
//             _ref: item.image,
//           },
//         },
//       };

//       const result = await client.createOrReplace(doc);
//       console.log("Data migrated:", result);
//     } catch (error) {
//       console.error("Error migrating data:", error);
//     }
//   }
// };

// migrateDataToSanity();



import sanityClient from "@sanity/client";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_TOKEN!,
});

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const fetchBeddingData = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>("https://www.sanity.io/manage/personal/project/da20m4e5/api");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const migrateDataToSanity = async () => {
  const beddingData = await fetchBeddingData();

  if (!beddingData.length) {
    console.log("No data available to migrate.");
    return;
  }

  for (const item of beddingData) {
    try {
      const doc = {
        _id: `product-${item.id}`, 
            _type: "product",
        title: item.name,
        description: item.description,
        price: item.price,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: item.image,
          },
        },
      };

      const result = await client.createOrReplace(doc);
      console.log("Data migrated:", result);
    } catch (error) {
      console.error("Error migrating data:", error);
    }
  }
};

migrateDataToSanity();
