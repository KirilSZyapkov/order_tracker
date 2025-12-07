"use client"

import { useState } from "react";
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
import { ShipmentType } from "@/types/shipmentType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const data: ShipmentType[] = [
  {
    id: "1",
    orderNumber: "ORD-1001",
    autherId: "AUTH-1",
    truckId: "TRK-11",
    truckNumber: "CA1234AB",
    clientName: "Иван Петров",
    deliveryAddress: "ул. Шипка 12, София",
    deliveryDay: "2025-01-10",
    actualDeliveryDay: "2025-01-10",
    deliveryTime: "14:30",
    phone: "+359888111222",
    gpsCoordinates: "42.6977,23.3219",
    recipientName: "Ив. Петров",
    status: "delivered",
    organizationName: "TransLogistics",
    createdAt: "2025-01-05T09:20:00Z",
    updatedAt: "2025-01-10T15:00:00Z"
  },
  {
    id: "2",
    orderNumber: "ORD-1002",
    autherId: "AUTH-2",
    truckId: "TRK-12",
    truckNumber: "CB5678CD",
    clientName: "Мария Георгиева",
    deliveryAddress: "бул. Витоша 55, София",
    deliveryDay: "2025-01-11",
    phone: "+359888222333",
    gpsCoordinates: "42.6833,23.3167",
    status: "in_progress",
    organizationName: "FastExpress",
    createdAt: "2025-01-06T11:00:00Z",
    updatedAt: "2025-01-09T08:00:00Z"
  },
  {
    id: "3",
    orderNumber: "ORD-1003",
    autherId: "AUTH-3",
    clientName: "ТехноМаркет",
    deliveryAddress: "ул. Европа 99, Пловдив",
    deliveryDay: "2025-01-12",
    phone: "+359888333444",
    status: "pending",
    organizationName: "TransLogistics",
    createdAt: "2025-01-07T10:00:00Z",
    updatedAt: "2025-01-07T10:00:00Z"
  },
  {
    id: "4",
    orderNumber: "ORD-1004",
    autherId: "AUTH-1",
    truckId: "TRK-14",
    truckNumber: "PB2345EF",
    clientName: "Omega Stores",
    deliveryAddress: "ул. Марица 14, Пловдив",
    deliveryDay: "2025-01-15",
    phone: "+359888444555",
    gpsCoordinates: "42.1354,24.7453",
    recipientName: "Петър Н.",
    status: "delivered",
    organizationName: "CargoPlus",
    createdAt: "2025-01-08T12:00:00Z",
    updatedAt: "2025-01-15T12:20:00Z"
  },
  {
    id: "5",
    orderNumber: "ORD-1005",
    autherId: "AUTH-4",
    clientName: "Сладкарски Цех ЕООД",
    deliveryAddress: "ул. Липа 8, Варна",
    deliveryDay: "2025-01-13",
    phone: "+359888555666",
    deliveryTime: "10:00",
    status: "canceled",
    organizationName: "FastExpress",
    createdAt: "2025-01-09T08:40:00Z",
    updatedAt: "2025-01-10T09:00:00Z"
  },
  {
    id: "6",
    orderNumber: "ORD-1006",
    autherId: "AUTH-5",
    truckId: "TRK-15",
    truckNumber: "B1234KM",
    clientName: "AutoParts BG",
    deliveryAddress: "бул. Черно море 101, Бургас",
    deliveryDay: "2025-01-16",
    actualDeliveryDay: "2025-01-16",
    phone: "+359888666777",
    gpsCoordinates: "42.5048,27.4626",
    status: "delivered",
    organizationName: "CargoPlus",
    createdAt: "2025-01-10T13:00:00Z",
    updatedAt: "2025-01-16T17:00:00Z"
  },
  {
    id: "7",
    orderNumber: "ORD-1007",
    autherId: "AUTH-6",
    clientName: "FreshFoods",
    deliveryAddress: "ул. Лоза 22, Русе",
    deliveryDay: "2025-01-14",
    phone: "+359888777888",
    gpsCoordinates: "43.8356,25.9657",
    status: "in_progress",
    organizationName: "TransLogistics",
    createdAt: "2025-01-11T09:15:00Z",
    updatedAt: "2025-01-14T07:30:00Z"
  },
  {
    id: "8",
    orderNumber: "ORD-1008",
    autherId: "AUTH-7",
    truckId: "TRK-19",
    truckNumber: "EH8899GH",
    clientName: "MegaBuild",
    deliveryAddress: "ул. Индустриална 4, Стара Загора",
    deliveryDay: "2025-01-17",
    deliveryTime: "16:00",
    phone: "+359888888999",
    recipientName: "Георги Милев",
    status: "pending",
    organizationName: "CargoPlus",
    createdAt: "2025-01-12T10:00:00Z",
    updatedAt: "2025-01-12T10:00:00Z"
  },
  {
    id: "9",
    orderNumber: "ORD-1009",
    autherId: "AUTH-8",
    clientName: "HomeCenter",
    deliveryAddress: "бул. Армейски 4, Плевен",
    deliveryDay: "2025-01-18",
    phone: "+359887001122",
    status: "in_progress",
    organizationName: "FastExpress",
    createdAt: "2025-01-13T11:30:00Z",
    updatedAt: "2025-01-14T12:00:00Z"
  },
  {
    id: "10",
    orderNumber: "ORD-1010",
    autherId: "AUTH-9",
    truckId: "TRK-20",
    truckNumber: "TX4455FX",
    clientName: "BioMarket",
    deliveryAddress: "ул. Еко 12, Добрич",
    deliveryDay: "2025-01-19",
    phone: "+359888999000",
    gpsCoordinates: "43.5726,27.8273",
    status: "pending",
    organizationName: "TransLogistics",
    createdAt: "2025-01-14T14:00:00Z",
    updatedAt: "2025-01-14T14:00:00Z"
  }
]



export const columns: ColumnDef<ShipmentType>[] = [
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

export default function ordersList() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
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

  return (
    <div className="w-full">
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
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
