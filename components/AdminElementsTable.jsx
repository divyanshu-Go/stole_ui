import { format } from "date-fns";
import { Eye, Folders, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PopoverMenu from "./PopoverMenu"; // Make sure this path is correct
import Link from "next/link";

const AdminElementsTable = ({
  elements,
  router,
  setElementToDelete,
  setDeleteDialogOpen,
  setStatusUpdateInfo,
  setStatusDialogOpen,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getStatusHoverColor = (status) => {
    switch (status) {
      case "approved":
        return "hover:bg-green-600";
      case "rejected":
        return "hover:bg-red-600";
      default:
        return "hover:bg-yellow-600";
    }
  };

  return (
    <Card className="card">
      <CardHeader className="relative">
        <CardTitle className="card-title">Element Submissions</CardTitle>
        <CardDescription className="card-description">
          Manage and review submitted elements
        </CardDescription>

      </CardHeader>
      <CardContent>
        {elements.length === 0 ? (
          <div className="text-center bg-zinc-800 p-4 rounded border border-zinc-700">
            No submissions yet!
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-hidden py-4 text-base max-[600px]:text-[95%]">
            <table className="w-full rounded-lg">
              <thead>
                <tr className="text-center bg-zinc-800 border-b border-zinc-600">
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Created</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-stone-950">
                {elements.map((element) => (
                  <tr key={element._id} className="text-center border-b border-zinc-700">
                    <td className="py-4">
                      <Badge
                        variant="secondary"
                        className="bg-slate-300 capitalize pt-1 rounded-sm hover:bg-slate-400"
                      >
                        {element.category}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge
                        className={`${getStatusColor(element.status)} ${getStatusHoverColor(
                          element.status
                        )} capitalize pt-1 rounded-sm text-stone-950 font-semibold`}
                      >
                        {element.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-zinc-400">
                      {format(new Date(element.createdAt), "MMM dd, yyyy")}
                    </td>
                    <td className="py-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(`/elements/elementId/${element._id}`)
                          }
                          className="p-3 hover:bg-slate-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <PopoverMenu
                          element={element}
                          setStatusUpdateInfo={setStatusUpdateInfo}
                          setStatusDialogOpen={setStatusDialogOpen}
                        />

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setElementToDelete(element);
                            setDeleteDialogOpen(true);
                          }}
                          className="p-3 text-red-500 hover:text-red-700 hover:bg-slate-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminElementsTable;
