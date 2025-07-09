<script setup lang="ts" generic="TData extends object, TValue, Paginated extends boolean = true">
import type { ColumnDef, ColumnMeta } from '@tanstack/vue-table'
import { createColumnHelper, FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

import type { TableOptionsWithReactiveData } from '@tanstack/vue-table'
import { VisuallyHidden } from 'reka-ui'
import Checkbox from '@/components/ui/checkbox/Checkbox.vue'

type Data = TData[]
type DataPaginated = PaginatedData<TData>
const props = withDefaults(
  defineProps<{
    columns?: ColumnDef<TData, TValue>[]
    data: Paginated extends true ? DataPaginated : Data
    caption?: string
    paginated?: Paginated | boolean
    selection?: boolean
    sorting?: boolean
    search?: boolean
    asCard?: boolean
    filters?: Record<string, any>
    initialOptions?: Partial<TableOptionsWithReactiveData<TData>>
    rightPinnedColumns?: string[]
    leftPinnedColumns?: string[]
    stickyHeader?: boolean
  }>(),
  {
    search: true,
    asCard: true,
    paginated: true,
  },
)

const resolvedData = computed<Data>(() => {
  return props.paginated
    ? [...((props.data as DataPaginated)?.data ?? [])]
    : [...((props.data as Data) ?? [])]
})
const resolvedColumns = computed<ColumnDef<TData, TValue>[] | []>(() => {
  if (props.selection) {
    return [
      columnHelper.display({
        id: 'select',
        header: ({ table }) =>
          h(Checkbox, {
            modelValue: table.getIsSomePageRowsSelected()
              ? 'indeterminate'
              : table.getIsAllPageRowsSelected(),
            'onUpdate:model-value': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
            ariaLabel: 'Select All',
          }),
        cell: ({ row }) =>
          h(Checkbox, {
            modelValue: row.getIsSelected(),
            'onUpdate:model-value': (value: boolean) => row.toggleSelected(!!value),
            ariaLabel: 'select row',
          }),
        enableSorting: false,
        enableHiding: false,
      }),
      ...(props.columns ?? []),
    ]
  }
  return props.columns ?? []
})
const columnHelper = createColumnHelper<TData>()

const table = useVueTable({
  get data() {
    return resolvedData.value ?? []
  },
  columns: resolvedColumns.value,
  getCoreRowModel: getCoreRowModel(),
  meta: {
    caption: props.caption,
  },
  initialState: {
    columnPinning: {
      left: ['select', ...(props.leftPinnedColumns ?? [])],
      right: ['actions', ...(props.rightPinnedColumns ?? [])],
    },
  },
  getRowId(originalRow, index, parent) {
    return String(originalRow.id ?? index)
  },
  // manualPagination: true,
  get rowCount() {
    return props.paginated ? (props.data as DataPaginated)?.meta?.total : undefined
  },
  ...(props.initialOptions ?? {}),
})
const bulkActionsDisabled = computed(() => !table.getFilteredSelectedRowModel().rows.length)

const selectedRows = computed(() => {
  return table.getFilteredSelectedRowModel().rows.map((row) => row.original)
})

const alignVariants: Record<'start' | 'center' | 'end', string> = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
}

const defaultAlignedCenterColumns = ['actions', 'is_active', 'status']
</script>

<template>
  <div
    :class="[
      'flex flex-col gap-4',
      {
        'border-neutral-alpha-border-100 p-sp-md rounded-lg  border': props.asCard,
        'max-h-svh': props.stickyHeader,
      },
    ]"
  >
    <div v-if="props.search || $slots.filter" class="gap-sp-xl flex items-center justify-between">
      <div class="gap-sp-xl flex items-center">
        <span v-if="table.getFilteredSelectedRowModel().rows.length" class="text-component-2"
          >selected &lpar; {{ table.getFilteredSelectedRowModel().rows.length }} &rpar;</span
        >

        <slot
          name="actions"
          :selectedRows="selectedRows"
          :disabled="bulkActionsDisabled"
          :resetRowSelection="() => table.resetRowSelection()"
        >
        </slot>
      </div>
    </div>
    <slot name="data" :data="table.getRowModel().rows">
      <Table>
        <VisuallyHidden>
          <TableCaption v-if="table.options.meta?.caption">{{
            table.options.meta?.caption
          }}</TableCaption>
        </VisuallyHidden>
        <TableHeader>
          <TableRow
            :class="[{ 'sticky top-0 z-30': props.stickyHeader }]"
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :data-pinned="header.column.getIsPinned()"
              :class="[
                {
                  'sticky z-20': header.column.getIsPinned(),
                  'start-0': header.column.getIsPinned() === 'left',
                  'end-0': header.column.getIsPinned() === 'right',
                },
                header.column.columnDef.id &&
                  defaultAlignedCenterColumns.includes(header.column.columnDef.id) &&
                  'text-center',
                header.column.columnDef.meta?.align &&
                  alignVariants[header.column.columnDef.meta?.align],
                header.column.columnDef.meta?.headerClass,
              ]"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <slot name="body" :table="table" :resolvedData="resolvedData">
          <TableBody :key="resolvedData.length">
            <template v-if="table.getRowModel().rows?.length">
              <template v-for="row in table.getRowModel().rows" :key="row.id">
                <slot name="row" :row="row">
                  <TableRow :data-state="row.getIsSelected() && 'selected'">
                    <TableCell
                      v-for="cell in row.getVisibleCells()"
                      :key="cell.id"
                      :data-pinned="cell.column.getIsPinned()"
                      :class="[
                        {
                          sticky: cell.column.getIsPinned(),
                          'start-0': cell.column.getIsPinned() === 'left',
                          'end-0': cell.column.getIsPinned() === 'right',
                        },
                        cell.column.columnDef.id &&
                          defaultAlignedCenterColumns.includes(cell.column.columnDef.id) &&
                          'text-center',
                        cell.column.columnDef.meta?.align &&
                          alignVariants[cell.column.columnDef.meta?.align],
                        cell.column.columnDef.meta?.cellClass,
                      ]"
                    >
                      <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    :id="`expanded-row-${row.id}`"
                    :aria-hidden="!row.getIsExpanded()"
                    v-if="row.getIsExpanded()"
                  >
                    <TableCell class="px-0 py-0" :colSpan="row.getAllCells().length">
                      <slot name="expanded-row" :row="row" />
                    </TableCell>
                  </TableRow>
                </slot>
              </template>
            </template>
            <TableEmpty v-else :colspan="table.getAllColumns().length">
              <slot name="empty" />
            </TableEmpty>
          </TableBody>
        </slot>
      </Table>
    </slot>
    <Pagination
      class="mb-4 ms-auto"
      v-if="props.paginated && props?.data?.meta"
      :itemsPerPage="props.data.meta.per_page"
      :meta="(props.data as DataPaginated)?.meta"
    />
  </div>
</template>

<style></style>
