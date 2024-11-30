import axios from "axios";
import * as cheerio from "cheerio";

const classNames = {
  result: "main.pdp-main",
  result_notices: "ul.psw-l-columns",
  result_editions: "div.psw-l-grid",
  result_editions_offers: "label.psw-label",
  result_editions_features: "ul.psw-t-list",
};

const getGameUrl = () => {
  return `https://store.playstation.com/en-gb/product/`;
};

export const getGameInfo = async (id) => {
  try {
    const searchUrl = getGameUrl() + id;
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
    const searchResult = $(classNames.result);
    const productDetails = await getGameDetails(searchResult);

    const notices = searchResult
      .find('ul[data-qa="mfe-compatibility-notices#notices"]')
      .children();
    let productNotices = await getGameNotices($, notices);

    const editions = searchResult.find('div[data-qa="mfeUpsell"]').children();
    const productEditions = await getGameEditions(editions);
    const addOns = searchResult.find('ul[data-qa="add-ons"]').children();
    const productAddOns = await getGameAddOns($, addOns);

    let resultObj = {
      id: id,
      ...productDetails,
      notices: productNotices,
      editions: productEditions,
      addOns: productAddOns,
    };

    const returnObject = {
      searchUrl: searchUrl,
      searchResult: resultObj,
    };

    return returnObject;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getGameDetails = async (searchResult) => {
  const name = searchResult
    .find('h1[data-qa="mfe-game-title#name"]')
    .text()
    .trim();
  const description = searchResult
    .find('p[data-qa="mfe-game-overview#description"]')
    .html();
  const image = searchResult
    .find('img[data-qa="gameBackgroundImage#heroImage#preview"]')
    .attr("src");
  const publisher = searchResult
    .find('div[data-qa="mfe-game-title#publisher"]')
    .text()
    .trim();
  const platforms = searchResult
    .find('dd[data-qa="gameInfo#releaseInformation#platform-value"]')
    .text()
    .trim()
    .split(", ");
  const releaseDate = searchResult
    .find('dd[data-qa="gameInfo#releaseInformation#releaseDate-value"]')
    .text()
    .trim();
  const genres = searchResult
    .find('dd[data-qa="gameInfo#releaseInformation#genre-value"]')
    .text()
    .trim()
    .split(", ");
  const averageRating = searchResult
    .find('div[data-qa="mfe-game-title#average-rating"]')
    .text()
    .trim();
  const ratingCount = searchResult
    .find('div[data-qa="mfe-game-title#rating-count"]')
    .text()
    .trim();
  let stars = 0;
  searchResult
    .find('span[data-qa="mfe-game-title#star-rating"]')
    .children()
    .toArray()
    .forEach((item) => {
      if (
        item.attributes.some(
          (attr) => attr.name === "class" && attr.value.includes("full")
        )
      )
        stars += 1;
      else if (
        item.attributes.some(
          (attr) => attr.name === "class" && attr.value.includes("half")
        )
      )
        stars += 0.5;
    });
  const age_rating_descriptors_text = searchResult
    .find('span[data-qa="mfe-content-rating#textDescriptors"]')
    .text()
    .trim()
    .split(", ");

  const age_rating_descriptors = [];
  age_rating_descriptors_text.forEach((element, index) => {
    const image = searchResult
      .find(`img[data-qa="mfe-content-rating#imageDescriptor${index}#preview"]`)
      .attr("src");
    age_rating_descriptors.push({
      image: image,
      text: element,
    });
  });
  const age_rating_image = searchResult
    .find('img[data-qa="mfe-content-rating#ratingImage#preview"]')
    .attr("src");

  return {
    name: name,
    description: description,
    image: image,
    publisher: publisher,
    platforms: platforms,
    release_date: releaseDate,
    genres: genres,
    rating: {
      average: averageRating,
      stars: stars,
      ratingCount: ratingCount,
    },
    age_rating: {
      image_url: age_rating_image,
      descriptors: age_rating_descriptors,
    },
  };
};

const getGameNotices = async ($, notices) => {
  const results = [];
  notices.each((index, element) => {
    let notice = $(element).text().trim();
    if (notice.includes("PS5 Version"))
      notice = notice.replace("PS5 Version", "PS5 Version: ");
    results.push(notice);
  });
  return Array.from(new Set(results));
};

const getGameEditions = async (editions) => {
  const results = [];
  const $ = cheerio.load(editions.toString());
  const entries = $(classNames.result_editions).children();
  entries.each(async (index, element) => {
    const productName = $(element)
      .find(`h3[data-qa="mfeUpsell#productEdition${index}#editionName"]`)
      .text()
      .trim();

    const productImage = $(element)
      .find(`img[data-qa="mfeUpsell#productEdition${index}#media#preview"]`)
      .attr("src");
    const offers = $(element).find(
      `div[data-qa="mfeUpsell#productEdition${index}#ctaWithPrice"]`
    );
    const productOffers = await getGameEditionOffers(index, offers);

    const productPlatforms = $(element)
      .find("span.psw-t-tag")
      .toArray()
      .map((item) => $(item).text());

    const features = $(element).find(
      `ul[data-qa="mfeUpsell#productEdition${index}#features"]`
    );
    const productFeatures = await getGameEditionFeatures(features);

    results.push({
      name: productName,
      image: productImage,
      offers: productOffers,
      platforms: productPlatforms,
      features: productFeatures,
    });
  });

  return results;
};

const getGameEditionOffers = async (editionIndex, offers) => {
  const results = [];
  const $ = cheerio.load(offers.toString());
  const entries = $(classNames.result_editions_offers);
  entries.each((index, element) => {
    const currentPrice = $(element)
      .find(
        `span[data-qa="mfeUpsell#productEdition${editionIndex}#ctaWithPrice#offer${index}#finalPrice"]`
      )
      .text()
      .trim();
    const originalPrice = $(element)
      .find(
        `span[data-qa="mfeUpsell#productEdition${editionIndex}#ctaWithPrice#offer${index}#originalPrice"]`
      )
      .text()
      .trim();
    const discount = $(element)
      .find(
        `span[data-qa="mfeUpsell#productEdition${editionIndex}#ctaWithPrice#offer${index}#discountInfo"]`
      )
      .text()
      .trim()
      .replace("Save ", "");
    const expiryDate = $(element)
      .find(
        `span[data-qa="mfeUpsell#productEdition${editionIndex}#ctaWithPrice#offer${index}#discountDescriptor"]`
      )
      .text()
      .trim()
      .replace("Offer ends", "");

    results.push({
      currentPrice: currentPrice,
      originalPrice: originalPrice,
      discount: discount ? `-${discount}` : "",
      expiryDate: expiryDate,
    });
  });

  return results;
};

const getGameEditionFeatures = async (features) => {
  const results = [];
  const $ = cheerio.load(features.toString());
  const entries = $(classNames.result_editions_features).children();
  entries.each((index, element) => {
    return results.push($(element).text());
  });

  return results;
};

const getGameAddOns = async ($, addOns) => {
  const results = [];
  addOns.each((index, element) => {
    const name = $(element)
      .find(`span[data-qa="add-ons-grid#${index}#product-name"]`)
      .text()
      .trim();
    const currentPrice = $(element)
      .find(`span[data-qa="add-ons-grid#${index}#price#display-price"]`)
      .text()
      .trim();
    const originalPrice = $(element)
      .find(`span[data-qa="add-ons-grid#${index}#price#price-strikethrough"]`)
      .text()
      .trim();
    const discount = $(element)
      .find(`span[data-qa="add-ons-grid#${index}#discount-badge#text"]`)
      .text()
      .trim();
    const image = $(element)
      .find(`img[data-qa="add-ons-grid#${index}#game-art#image#preview"]`)
      .attr("src");
    const platforms = $(element)
      .find("span.psw-platform-tag")
      .toArray()
      .map((item) => $(item).text());
    const type = $(element)
      .find(`span[data-qa="add-ons-grid#${index}#product-type"]`)
      .text()
      .trim();
    const url = $(element).find("a").attr("href");
    const id = url.replace(getGameUrl(), "");

    results.push({
      id: id,
      name: name,
      image: image,
      platforms: platforms,
      type: type,
      url: url,
      price: {
        current_price: currentPrice,
        originalPrice: originalPrice,
        discount: discount,
      },
    });
  });

  return results;
};
