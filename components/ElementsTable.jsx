import { format } from "date-fns";
import { Edit, Folders, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ElementsTable = ({
  user,
  elements,
  router,
  setElementToDelete,
  setDeleteDialogOpen,
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
        <CardTitle className="card-title">Your Contributions</CardTitle>
        <CardDescription className="card-description">
          Manage your submitted elements
        </CardDescription>
        {user?.role =='admin' &&
        <button
          onClick={() => router.push(`/admin-profile`)}
          className="border text-sm absolute right-6 top-4 p-2 flex rounded items-center border-indigo-500 text-indigo-300 hover:bg-indigo-700 hover:text-white"
        >
          <Folders className="w-5 h-4 mr-2" />
          Manage All Submittions
        </button>}
      </CardHeader>
      <CardContent>
        {elements.length === 0 ? (
          <div className="flex flex-col gap-2">
            <div className="font-medium text-center rounded bg-zinc-800 border-zinc-600 p-4">
              No eLements submitted yet !
            </div>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => router.push("/add-component")}
            >
              <Pencil className="w-4 h-4 mr-2" />
              Create Now
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto  py-4 text-base max-[600px]:text-[95%]">
            <table className="w-full overflow-hidden rounded-lg ">
              <thead className="">
                <tr className=" text-center bg-zinc-800 border-b border-zinc-600">
                  {/* <th className="py-4 px-4">Title</th> */}
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Created</th>
                  <th className="py-4 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-stone-950">
                {elements.map((element) => (
                  <tr
                    key={element._id}
                    className="border-b text-center border-zinc-700 "
                  >
                    {/* <td className="py-4 ">{element.title}</td> */}
                    <td className="py-4 ">
                      <Badge
                        variant="secondary"
                        className={`bg-slate-300 capitalize pt-1 rounded-sm hover:bg-slate-400`}
                      >
                        <p className="max-[600px]:text-[95%]">
                          {element.category}
                        </p>
                      </Badge>
                    </td>
                    <td className="py-4 ">
                      <Badge
                        className={`${getStatusColor(
                          element.status
                        )} ${getStatusHoverColor(element.status)} max-[600px]:text-50%] capitalize pt-1 rounded-sm text-stone-950 font-semibold`}
                      >
                        <p className="max-[600px]:text-[95%]">
                          {element.status}
                        </p>
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-zinc-400  max-[600px]:text-[95%]">
                      {format(new Date(element.createdAt), "MMM dd, yyyy")}
                    </td>
                    <td className="py-4 ">
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(
                              `/elements/elementId/${element._id}/edit`
                            )
                          }
                          className=" p-3 hover:bg-slate-300"
                        >
                          <Edit className="w-4 h-4 " />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setElementToDelete(element);
                            setDeleteDialogOpen(true);
                          }}
                          className=" p-3 hover:bg-slate-300 text-red-500 hover:text-red-700"
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

export default ElementsTable;
