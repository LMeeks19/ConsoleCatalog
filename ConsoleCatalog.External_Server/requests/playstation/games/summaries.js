import axios from "axios";
import * as cheerio from "cheerio";

const classNames = {
  resultList: "ul.psw-grid-list",
  results_pages: "ol.psw-l-space-x-1",
};

const getSearchUrl = (searchString) => {
  const baseUrl = "https://store.playstation.com/en-gb/search/";
  searchString = searchString.toLowerCase();
  searchString = searchString.replaceAll(" ", "%20");
  return baseUrl + searchString;
};

const getSearchUrlPage = (searchString, page) => {
  const baseUrl = "https://store.playstation.com/en-gb/search/";
  searchString = searchString.toLowerCase();
  searchString = searchString.replaceAll(" ", "%20");
  return baseUrl + searchString + "/" + page;
};

export const getGamesSummaries = async (searchString) => {
  try {
    const resultArr = [];
    const searchUrl = getSearchUrl(searchString);
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
    const pages = $(classNames.results_pages).children();

    for (let page = 1; page <= pages.length; page++) {
      const searchUrl = getSearchUrlPage(searchString, page);
      const response = await axios.get(searchUrl);
      const $ = cheerio.load(response.data);
      const searchResults = $(classNames.resultList).children();

      searchResults.each((index, element) => {
        let productDetails = JSON.parse(
          $(element).find("a").attr("data-telemetry-meta")
        );
        const productType = $(element)
          .find(`span[data-qa="search#productTile${index}#product-type"]`)
          .text()
          .trim();
        const productOriginalPrice = $(element)
          .find(`s[data-qa="search#productTile10#price#price-strikethrough"]`)
          .text()
          .trim();
        const productDiscount = $(element)
          .find(
            `span[data-qa="search#productTile${index}#discount-badge#text"]`
          )
          .text()
          .trim();
        const productPlatforms = $(element)
          .find(`div[data-qa="search#productTile${index}#game-art"]`)
          .children()
          .toArray()
          .filter((item) => $(item).attr("data-qa"))
          .map((item) => $(item).text());
        const productImageUrl = $(element)
          .find(
            `img[data-qa="search#productTile${index}#game-art#image#preview"]`
          )
          .attr("src").replace("w=54&thumb=true", "w=128");

        resultArr.push({
          id: productDetails.id,
          titleId: productDetails.titleId,
          name: productDetails.name,
          type: productType,
          platforms: productPlatforms,
          current_price: productDetails.price,
          original_price: productOriginalPrice,
          discount: productDiscount,
          image_url: productImageUrl,
        });
      });
    }

    const returnObject = {
      searchUrl: searchUrl,
      searchResults: resultArr.filter((result) => result.type === ""),
    };

    return returnObject;
  } catch (error) {
    console.error("Error:", error);
  }
};
