import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const getPrev = (prev: string) => (prev === "/" ? "/" : `/?page=${prev}`);

export function ServerPagination({ nextPage, prev }: any) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious disabled={prev === null} href={getPrev(prev)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext disabled={!nextPage} href={`/?page=${nextPage}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
