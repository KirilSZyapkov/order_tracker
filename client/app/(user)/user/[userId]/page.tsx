"use client";

import { apiFetch } from "@/lib/utils";
import { useAppStore } from "@/store/store";
import { useState, useEffect } from "react";
import { ShipmentType } from "@/types/shipmentType";
import Loader from "@/components/shared/Loader";
import Link from "next/link";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";


export default function UserPage() {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const curUser = useAppStore((state) => state.user);
  const isUserLoaded = useAppStore((state) => state.isUserLoaded);
  const [shipments, setShipments] = useState<ShipmentType[]>([]);

  useEffect(() => {
    async function fetch() {
      if (curUser) {
        const response = await apiFetch<ShipmentType[]>(`/api/shipments/list/${curUser?.id}/${curUser?.organizationName}`);
        setShipments(response ?? []);
      }
    }
    fetch();
  }, [curUser]);

  const columns: ColumnDef<ShipmentType>[] = [
    {
      accessorKey: "orderNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          Order Number
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("orderNumber")}</div>,
    },

    {
      accessorKey: "clientName",
      header: "Client Name",
      cell: ({ row }) => <div>{row.getValue("clientName")}</div>,
    },

    {
      accessorKey: "deliveryAddress",
      header: "Delivery Address",
      cell: ({ row }) => <div>{row.getValue("deliveryAddress")}</div>,
    },

    {
      accessorKey: "deliveryDay",
      header: "Delivery Day",
      cell: ({ row }) => <div>{row.getValue("deliveryDay")}</div>,
    },

    {
      accessorKey: "actualDeliveryDay",
      header: "Actual Delivery Day",
      cell: ({ row }) => <div>{row.getValue("actualDeliveryDay") || "-"}</div>,
    },

    {
      accessorKey: "deliveryTime",
      header: "Delivery Time",
      cell: ({ row }) => <div>{row.getValue("deliveryTime") || "-"}</div>,
    },

    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },

    {
      accessorKey: "gpsCoordinates",
      header: "GPS",

      cell: ({ row }) => <Link href={row.getValue("gpsCoordinates")}>{row.getValue("gpsCoordinates") || "-"}</Link>,
    },

    {
      accessorKey: "recipientName",
      header: "Recipient",
      cell: ({ row }) => <div>{row.getValue("recipientName") || "-"}</div>,
    },

    {
      accessorKey: "truckNumber",
      header: "Truck Number",
      cell: ({ row }) => <div>{row.getValue("truckNumber") || "-"}</div>,
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const orderN = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => (navigator.clipboard.writeText(orderN.orderNumber), toast.success("Order number copied!")) }
              >
                Copy Order N
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => orderN.truckNumber ? (navigator.clipboard.writeText(orderN.truckNumber), toast.success("Truck number copied!")) : toast.error("Truck number is not assigned")}
              >
                Copy Truck Number
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" className="cursor-pointer">Delete</DropdownMenuItem>
              {/* To do ... to add more actions(like "eddit") */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  const table = useReactTable({
    data: shipments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (!isUserLoaded) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    )
  };

  return (
    <div className="w-full px-8 py-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">My Orders</h2>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter orders..."
          value={(table.getColumn("orderNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("orderNumber")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length > 0 && (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}