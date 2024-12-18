import { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Motqen")
    .items([
      // Manually add specific schemas
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      S.documentTypeListItem("carousel").title("Carousel"),
      S.divider(),
      S.documentTypeListItem("news").title("News"),
      S.divider(),
      // Dynamically include all other document types, excluding 'testimonial', 'carousel', 'news'
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["testimonial", "carousel", "news"].includes(item.getId()!),
      ),
    ]);
