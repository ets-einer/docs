import React from "react";
import type { ReactNode } from "react";
import type {
  PageTree,
  PageFolder,
  PageChildren,
  PageFrontMatter,
} from "./LeftSidebar.astro";
import "./LeftSidebar.css";

import { SIDEBAR } from "../../config";
import { url } from "inspector";

type LeftSidebarTreeProps = {
  tree: PageTree;
  langCode: string;
  currentPageMatch: string;
  Astro: any;
};

export default function LeftSidebarTree({
  tree,
  langCode,
  currentPageMatch,
  Astro,
}: LeftSidebarTreeProps) {
  // const sidebar = SIDEBAR[langCode];
  return (
    <div>
      {Object.entries(tree).map(([keyP, valueP]) => {
        return (
          <ul>
            {(function renderSideBar(
              key: string,
              value: string | number | PageFolder | PageChildren | PageTree
            ): ReactNode {
              if (
                key !== "children" &&
                key !== "folders" &&
                typeof value !== "string" &&
                typeof value !== "number" &&
                !value.folders &&
                !value.children &&
                "title" in value &&
                "url" in value &&
                typeof value.url === "string"
              ) {
                return (
                  <li
                    aria-current={
                      currentPageMatch === value.url + "/" ? "page" : false
                    }
                    className="nav-link"
                  >
                    <a href={value.url}>{value.title}</a>
                  </li>
                );
              }

              if (key === "folders") {
                return Object.entries(value).map(
                  ([foldersChildKey, foldersChildValue]) => {
                    if (!foldersChildValue.name) {
                      return renderSideBar(foldersChildKey, foldersChildValue);
                    }
                    return (
                      <li className="nav-group">
                        <div className="nav-link bold">
                          <p>
                            <b>{foldersChildValue.name}</b>
                          </p>
                        </div>

                        <ul className="identation">
                          {renderSideBar(foldersChildKey, foldersChildValue)}
                        </ul>
                      </li>
                    );
                  }
                );
              }

              if (key === "children") {
                return Object.entries(value).map(
                  ([ChildrenChildKey, ChildrenChildValue]) => {
                    return renderSideBar(ChildrenChildKey, ChildrenChildValue);
                  }
                );
              }

              if (
                (typeof value !== "string" &&
                  typeof value !== "number" &&
                  value.children) ||
                (typeof value !== "string" &&
                  typeof value !== "number" &&
                  value.folders)
              ) {
                return Object.entries(value).map(([ChildKey, ChildValue]) => {
                  return renderSideBar(ChildKey, ChildValue);
                });
              }
            })(keyP, valueP)}
          </ul>
        );
      })}
      {/* {Object.entries(sidebar).map(([header, children]) => (
        <li>
          <div className="nav-group">
            <h2>{header}</h2>
            <ul>
              {children.map((child) => {
                const url = Astro.site?.pathname + child.link;
                return (
                  <li class="nav-link">
                    <a
                      href={url}
                      aria-current={
                        currentPageMatch === child.link ? "page" : false
                      }
                    >
                      {child.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      ))} */}
    </div>
  );
}
