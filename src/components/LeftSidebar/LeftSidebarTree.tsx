import React from "react";
import type { PageTree, PageFolder, PageChildren } from "./LeftSidebar.astro";
import "./LeftSidebar.css";

import { SIDEBAR } from "../../config";

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
  // console.log(tree);
  return (
    <div>
      {Object.entries(tree.folders.pt).map(([keyP, valueP]) => {
        return (
          <li>
            {(function renderSideBar(
              key: string,
              value: string | number | PageFolder | PageChildren
            ) {
              if (
                key !== "children" &&
                key !== "folders" &&
                !value.folders &&
                !value.children
              ) {
                console.log(value);
                return (
                  <div>
                    <p>{value.title}</p>
                  </div>
                );
              }

              if (key === "folders") {
                return Object.entries(value).map(
                  ([foldersChildKey, foldersChildValue]) => {
                    // console.log({ foldersChildKey, foldersChildValue });
                    return (
                      <div>
                        <h3>{foldersChildValue.name}</h3>
                        {renderSideBar(foldersChildKey, foldersChildValue)}
                      </div>
                    );
                  }
                );
              }

              if (key === "children") {
                return Object.entries(value).map(
                  ([ChildrenChildKey, ChildrenChildValue]) => {
                    // console.log({ ChildrenChildKey, ChildrenChildValue });
                    return (
                      <div>
                        {renderSideBar(ChildrenChildKey, ChildrenChildValue)}
                      </div>
                    );
                  }
                );
              }

              if (value.children || value.folders) {
                return Object.entries(value).map(([ChildKey, ChildValue]) => {
                  // console.log({ ChildKey, ChildValue });
                  return <div>{renderSideBar(ChildKey, ChildValue)}</div>;
                });
              }

              // console.log({ key, value });
            })(keyP, valueP)}
          </li>
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
