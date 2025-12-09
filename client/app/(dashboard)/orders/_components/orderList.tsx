"use client"

import { useEffect, useState } from "react";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppStore } from "@/store/store";
import { useShipmentsSync } from "@/hooks/useShipmentsSync";

export default function ordersList() {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const user = useAppStore((state) => state.user);
  const shipment = useAppStore((state) => state.shipments);

  console.log(user);
  
  useShipmentsSync({ organizationName: "test organization" });

  console.log(shipment);

  const columns: ColumnDef<typeof shipment[0]>[] = [
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
      cell: ({ row }) => <div>{row.getValue("gpsCoordinates") || "-"}</div>,
    },

    {
      accessorKey: "recipientName",
      header: "Recipient",
      cell: ({ row }) => <div>{row.getValue("recipientName") || "-"}</div>,
    },

    {
      accessorKey: "truckNumber",
      header: "Truck Number",
      cell: ({ row }) => <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Truck number" />
        </SelectTrigger>
        <SelectContent>
          {/* Todo... to add all trucks */}
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>,
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
                onClick={() => navigator.clipboard.writeText(orderN.orderNumber)}
              >
                Copy Order N
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" className="cursor-pointer">Delete</DropdownMenuItem>
              {/* To do ... to add more actions(like "eddit") */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: shipment,
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
  })

  if (shipment) {

    return (
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Orders list</h2>
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
    )
  } else {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="h-24 text-center">
              No Orders
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}
