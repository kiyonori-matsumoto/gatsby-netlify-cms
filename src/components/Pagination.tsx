import React from "react";
import { Link } from "gatsby";
import { Column, Pagination } from "rbx";

const url = (page: number) => (page === 1 ? "/" : `/blogs/${page}`);

const _Pagination: React.FC<{ current: number; pageCount: number }> = ({
  current,
  pageCount
}) => (
  <Column size={12}>
    <Pagination align="centered" rounded>
      <Pagination.Step
        align="previous"
        as={Link}
        to={current <= 1 ? undefined : url(current - 1)}
        disabled={current <= 1}
      >
        前へ
      </Pagination.Step>
      <Pagination.Step
        align="next"
        as={Link}
        to={current >= pageCount ? undefined : url(current + 1)}
        disabled={current >= pageCount}
      >
        次へ
      </Pagination.Step>
      <Pagination.List>
        {current > 1 && (
          <Pagination.Link as={Link} to={url(1)}>
            1
          </Pagination.Link>
        )}
        {current > 2 && (
          <>
            <Pagination.Ellipsis />
            <Pagination.Link as={Link} to={url(current - 1)}>
              {current - 1}
            </Pagination.Link>
          </>
        )}
        <Pagination.Link current>{current}</Pagination.Link>
        {current < pageCount - 1 && (
          <>
            <Pagination.Link as={Link} to={url(pageCount)}>
              {current + 1}
            </Pagination.Link>
            <Pagination.Ellipsis />
          </>
        )}
        {current < pageCount && (
          <Pagination.Link as={Link} to={url(pageCount)}>
            {pageCount}
          </Pagination.Link>
        )}
      </Pagination.List>
    </Pagination>
  </Column>
);

export default _Pagination;
