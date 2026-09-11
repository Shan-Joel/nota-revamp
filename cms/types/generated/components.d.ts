import type { Schema, Struct } from "@strapi/strapi";

export interface ItemsAudience extends Struct.ComponentSchema {
  collectionName: "components_items_audiences";
  info: {
    description: "Numbered 01, 02, 03\u2026 automatically in the order listed.";
    displayName: "Audience card";
    icon: "user";
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItemsBoxItem extends Struct.ComponentSchema {
  collectionName: "components_items_box_items";
  info: {
    description: "Numbered 01, 02, 03\u2026 automatically in the order listed.";
    displayName: "Box item";
    icon: "cube";
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItemsCaption extends Struct.ComponentSchema {
  collectionName: "components_items_captions";
  info: {
    description: "One caption per notebook frame, shown in the same order.";
    displayName: "Scene caption";
    icon: "quote";
  };
  attributes: {
    body: Schema.Attribute.Text;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    headlineItalic: Schema.Attribute.String;
  };
}

export interface ItemsDetail extends Struct.ComponentSchema {
  collectionName: "components_items_details";
  info: {
    displayName: "Pen detail";
    icon: "information";
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    note: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItemsPanel extends Struct.ComponentSchema {
  collectionName: "components_items_panels";
  info: {
    displayName: "Text panel";
    icon: "layout";
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    paragraph: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ItemsSpecGroup extends Struct.ComponentSchema {
  collectionName: "components_items_spec_groups";
  info: {
    displayName: "Spec group";
    icon: "bulletList";
  };
  attributes: {
    items: Schema.Attribute.Component<"items.spec-item", true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ItemsSpecItem extends Struct.ComponentSchema {
  collectionName: "components_items_spec_items";
  info: {
    displayName: "Spec item";
    icon: "bulletList";
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBoxSet extends Struct.ComponentSchema {
  collectionName: "components_sections_box_sets";
  info: {
    displayName: "Complete set";
    icon: "cube";
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    headingItalic: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<"items.box-item", true>;
    paragraph: Schema.Attribute.Text & Schema.Attribute.Required;
    poster: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    video: Schema.Attribute.Media<"videos"> & Schema.Attribute.Required;
  };
}

export interface SectionsFooter extends Struct.ComponentSchema {
  collectionName: "components_sections_footers";
  info: {
    description: "Link list reuses the Navigation menu links.";
    displayName: "Footer";
    icon: "layout";
  };
  attributes: {
    backToTop: Schema.Attribute.Component<"shared.link", false> & Schema.Attribute.Required;
    copyright: Schema.Attribute.String & Schema.Attribute.Required;
    credit: Schema.Attribute.String & Schema.Attribute.Required;
    linksTitle: Schema.Attribute.String & Schema.Attribute.Required;
    logo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: "components_sections_heroes";
  info: {
    description: "Full-screen intro. Keep the studio pen render as the image: the scroll animation cuts the pen out with a fixed outline.";
    displayName: "Hero";
    icon: "star";
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    headlineLine1: Schema.Attribute.String & Schema.Attribute.Required;
    headlineLine2: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    primaryCta: Schema.Attribute.Component<"shared.link", false> & Schema.Attribute.Required;
    secondaryCta: Schema.Attribute.Component<"shared.link", false> & Schema.Attribute.Required;
  };
}

export interface SectionsInsideBox extends Struct.ComponentSchema {
  collectionName: "components_sections_inside_boxes";
  info: {
    description: "Pinned scroll scene: pen frames crossfade in order. Use 1920\u00D71080 pen renders.";
    displayName: "Inside the box (pinned)";
    icon: "play";
  };
  attributes: {
    details: Schema.Attribute.Component<"items.detail", true>;
    firstFrameAlt: Schema.Attribute.String;
    frames: Schema.Attribute.Media<"images", true> & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    headlineItalic: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsNav extends Struct.ComponentSchema {
  collectionName: "components_sections_navs";
  info: {
    description: "Header logo, menu links (also reused in the footer) and the price pill.";
    displayName: "Navigation";
    icon: "apps";
  };
  attributes: {
    cta: Schema.Attribute.Component<"shared.link", false> & Schema.Attribute.Required;
    ctaPrice: Schema.Attribute.String & Schema.Attribute.Required;
    links: Schema.Attribute.Component<"shared.link", true>;
    logo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsOrder extends Struct.ComponentSchema {
  collectionName: "components_sections_orders";
  info: {
    displayName: "Order";
    icon: "shoppingCart";
  };
  attributes: {
    cta: Schema.Attribute.Component<"shared.link", false> & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    imageAlt: Schema.Attribute.String;
    paragraph: Schema.Attribute.Text & Schema.Attribute.Required;
    price: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPhilosophy extends Struct.ComponentSchema {
  collectionName: "components_sections_philosophies";
  info: {
    description: "The centred quote the nav's About link points to.";
    displayName: "Philosophy quote";
    icon: "quote";
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsSmartPaper extends Struct.ComponentSchema {
  collectionName: "components_sections_smart_papers";
  info: {
    displayName: "Smart paper";
    icon: "picture";
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    headlineItalic: Schema.Attribute.String & Schema.Attribute.Required;
    image1: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    image1Alt: Schema.Attribute.String;
    image2: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    image2Alt: Schema.Attribute.String;
    panel1: Schema.Attribute.Component<"items.panel", false> & Schema.Attribute.Required;
    panel2: Schema.Attribute.Component<"items.panel", false> & Schema.Attribute.Required;
  };
}

export interface SectionsSpecs extends Struct.ComponentSchema {
  collectionName: "components_sections_specs";
  info: {
    displayName: "Specifications";
    icon: "bulletList";
  };
  attributes: {
    groups: Schema.Attribute.Component<"items.spec-group", true>;
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSyncScene extends Struct.ComponentSchema {
  collectionName: "components_sections_sync_scenes";
  info: {
    description: "Pinned scroll scene: frames crossfade in order, one caption per frame.";
    displayName: "Sync scene (pinned)";
    icon: "play";
  };
  attributes: {
    captions: Schema.Attribute.Component<"items.caption", true>;
    firstFrameAlt: Schema.Attribute.String;
    frames: Schema.Attribute.Media<"images", true> & Schema.Attribute.Required;
  };
}

export interface SectionsWhoFor extends Struct.ComponentSchema {
  collectionName: "components_sections_who_fors";
  info: {
    displayName: "Who it's for";
    icon: "user";
  };
  attributes: {
    audiences: Schema.Attribute.Component<"items.audience", true>;
    headlineItalic: Schema.Attribute.String & Schema.Attribute.Required;
    headlinePrefix: Schema.Attribute.String & Schema.Attribute.Required;
    paragraphLead: Schema.Attribute.Text & Schema.Attribute.Required;
    paragraphSecondary: Schema.Attribute.Text & Schema.Attribute.Required;
    video: Schema.Attribute.Media<"videos"> & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: "components_shared_links";
  info: {
    description: "A label and where it points (#anchor or URL).";
    displayName: "Link";
    icon: "link";
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: "components_shared_seos";
  info: {
    description: "Browser title, search snippet and social sharing image.";
    displayName: "SEO";
    icon: "search";
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    ogImage: Schema.Attribute.Media<"images"> & Schema.Attribute.Required;
    themeColor: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"#1a1a19">;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export namespace Public {
    export interface ComponentSchemas {
      "items.audience": ItemsAudience;
      "items.box-item": ItemsBoxItem;
      "items.caption": ItemsCaption;
      "items.detail": ItemsDetail;
      "items.panel": ItemsPanel;
      "items.spec-group": ItemsSpecGroup;
      "items.spec-item": ItemsSpecItem;
      "sections.box-set": SectionsBoxSet;
      "sections.footer": SectionsFooter;
      "sections.hero": SectionsHero;
      "sections.inside-box": SectionsInsideBox;
      "sections.nav": SectionsNav;
      "sections.order": SectionsOrder;
      "sections.philosophy": SectionsPhilosophy;
      "sections.smart-paper": SectionsSmartPaper;
      "sections.specs": SectionsSpecs;
      "sections.sync-scene": SectionsSyncScene;
      "sections.who-for": SectionsWhoFor;
      "shared.link": SharedLink;
      "shared.seo": SharedSeo;
    }
  }
}
