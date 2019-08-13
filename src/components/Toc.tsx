import React from "react";
import { Menu } from "rbx";

type TToc = {
  url?: string;
  title?: string;
  items?: TToc[];
};

const Toc: React.FC<{ items: TToc[] }> = ({ items }) => {
  return (
    <Menu
      style={{
        position: "sticky",
        top: "100px",
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto"
      }}
    >
      <Menu.Label>ナビゲーション</Menu.Label>
      <Menu.List>
        {items.map(i => (
          <TocItem key={i.url} toc={i} />
        ))}
      </Menu.List>
    </Menu>
  );
};

const TocItem: React.FC<{ toc: TToc }> = ({ toc }) => {
  return (
    <Menu.List.Item
      href={toc.url && encodeURI(toc.url)}
      menu={
        toc.items && (
          <Menu.List>
            {toc.items.map(i => (
              <TocItem key={i.url} toc={i} />
            ))}
          </Menu.List>
        )
      }
    >
      {toc.title}
    </Menu.List.Item>
  );
};

export default Toc;
