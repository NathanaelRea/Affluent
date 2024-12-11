import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { BasicActions } from "../basic-table";
import { categories } from "@/data";
import { Combobox } from "@/components/combobox";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/utils";

export const expensesSchema = z.object({
  name: z.string(),
  categoryId: z.string(),
  amount: z.coerce.number(),
});
export type Expenses = z.infer<typeof expensesSchema>;

export const expenseColumns: ColumnDef<Expenses>[] = [
  {
    accessorKey: "name",
    header: "Item",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      return (
        <Input
          value={row.original.name}
          onChange={(e) => {
            meta?.setValue?.(`expenses.${row.index}.name`, e.target.value);
          }}
        />
      );
    },
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      return (
        <Combobox
          name="category"
          items={categories.map((c) => {
            return {
              label: c.name,
              value: c.id,
            };
          })}
          value={row.original.categoryId}
          setValue={(v) => {
            meta?.setValue?.(`expenses.${row.index}.categoryId`, v);
          }}
        />
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      return (
        <Input
          value={formatMoney(row.original.amount)}
          onChange={(e) => {
            meta?.setValue?.(`expenses.${row.index}.amount`, e.target.value);
          }}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => (
      <BasicActions meta={table.options.meta} index={row.index} />
    ),
  },
];
