import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { LoadingClue } from "@/components/LoadingClue";
import { fetchPaginatedData } from "@/lib/utils";
import { Await, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/clues")({
  component: BrowseClues,
  loader: async () => {
    const cluesTableData = fetchPaginatedData();

    return {
      deferredClueData: cluesTableData,
    };
  },
  staleTime: Infinity,
});

function BrowseClues() {
  const { deferredClueData } = Route.useLoaderData();

  return (
    <Await promise={deferredClueData} fallback={<LoadingClue />}>
      {(data) => {
        return (
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        );
      }}
    </Await>
  );
}
