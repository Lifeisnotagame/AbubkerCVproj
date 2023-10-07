import { Client } from "@notionhq/client";
import React from "react";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const fetchPages = React.cache(() => {
  return notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
  });
});

export const fetchPageById = React.cache((pageId: string) => {
  return notion.pages.retrieve({
    page_id: pageId,
  });
});

export const fetchPageBlocks = React.cache((pageId: string) => {
  return notion.blocks.children.list({ block_id: pageId });
});
