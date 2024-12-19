import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";

import { testimonialType } from "./testimonialType";
import { carouselType } from "./carouselType";
import { newsType } from "./newsType";
import { governanceDocumentType } from "./governanceDocumentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    testimonialType,
    carouselType,
    newsType,
    governanceDocumentType,
  ],
};
